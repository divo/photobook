class PhotoAlbumsController < ApplicationController
  include ActiveStorage::SetCurrent
  before_action :set_photo_album, only: %i[ show edit update destroy print set_cover delete_page]
  before_action :authenticate_user!

  # GET /photo_albums or /photo_albums.json
  def index
    @photo_albums = current_user.photo_albums.all
  end

  # GET /photo_albums/1 or /photo_albums/1.json
  def show
  end

  # GET /photo_albums/new
  def new
    @photo_album = PhotoAlbum.new
  end

  # GET /photo_albums/1/edit
  def edit
  end

  # POST /photo_albums or /photo_albums.json
  def create
    @photo_album = PhotoAlbum.new(photo_album_params.merge(user_id: current_user.id))

    respond_to do |format|
      if @photo_album.save(context: :app)
        flow = UploadMetadataWorkflow.create(@photo_album.id)
        flow.start!
        format.html { redirect_to photo_album_url(@photo_album), notice: "Photo album was successfully created." }
        format.json { render :show, status: :created, location: @photo_album }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @photo_album.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /photo_albums/1 or /photo_albums/1.json
  def update
    respond_to do |format|
      @photo_album.assign_attributes(photo_album_params)
      if @photo_album.save(context: :app)
        # TODO: Start the metadata workflow??
        format.html { redirect_to photo_album_url(@photo_album), notice: "Photo album was successfully updated." }
        format.json { render :show, status: :ok, location: @photo_album }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @photo_album.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /photo_albums/1 or /photo_albums/1.json
  def destroy
    @photo_album.destroy

    respond_to do |format|
      format.html { redirect_to photo_albums_url, notice: "Photo album was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def print
    # This should use Stimulus fancyness. What should the flow even look like?
    RenderAlbumJob.perform_later(@photo_album.present { |image| image.url })
    respond_to do |format|
      format.html { redirect_to photo_album_url(@photo_album), notice: "Photo album was successfully queued for printing." }
      format.json { head :no_content }
    end
  end

  def set_cover
    @photo_album.set_cover(params[:cover_id])
    respond_to do |format|
      format.html { redirect_to photo_album_url(@photo_album) }
      format.json { head :no_content }
    end
  end

  def delete_page
    @photo_album.delete_image(params[:image_id])
    respond_to do |format|
      format.html { redirect_to photo_album_url(@photo_album), alert: "Photo was successfully deleted." }
      format.json { head :no_content }
    end
  end

  # TODO: Move to dedicated controller? My hacky datamodel makes this
  # requirement ambiguous. But I'll contrinue to ignore it
  def set_page_caption
    photo_album = current_user.photo_albums.find(params[:photo_album_id])
    image = photo_album.images.find(params[:image_id])
    image.metadata[:caption] = params[:caption]
    image.save
    respond_to do |format|
      # 303 because https://api.rubyonrails.org/v7.0.4/classes/ActionController/Redirecting.html#method-i-redirect_to
      format.html { redirect_to action: :show, status: 303, id: photo_album.id }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_photo_album
    @photo_album = current_user.photo_albums.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def photo_album_params
    params.require(:photo_album).permit(:name, images: [])
  end
end
