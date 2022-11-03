# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin_all_from "app/javascript/photo-canvas", under: "photo-canvas", preload: true
pin "canvas", to: "https://ga.jspm.io/npm:canvas@2.10.1/browser.js"
pin "canvas-sketch", to: "https://ga.jspm.io/npm:canvas-sketch@0.7.6/dist/canvas-sketch.umd.js"
