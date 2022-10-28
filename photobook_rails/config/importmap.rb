# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin "canvas-sketch", to: "https://ga.jspm.io/npm:canvas-sketch@0.7.6/dist/canvas-sketch.umd.js"
pin "p5", to: "https://ga.jspm.io/npm:p5@1.5.0/lib/p5.min.js"
pin "jquery", to: "https://ga.jspm.io/npm:jquery@3.6.1/dist/jquery.js"
