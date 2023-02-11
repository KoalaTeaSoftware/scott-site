rem see https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
rem see the companion file favicon-links.tx for the stuff to put in the head of the html file
magick  logo.fw.png -thumbnail 16x16   -alpha on -background none -flatten favicon-16.ico
magick  logo.fw.png -thumbnail 32x32   -alpha on -background none -flatten favicon-32.ico
magick  logo.fw.png -thumbnail 128x128 -alpha on -background none -flatten favicon-chrome-web-store-128.ico
magick  logo.fw.png -thumbnail 152x152 -alpha on -background none -flatten favicon-ipad-touch-icon-152.ico
magick  logo.fw.png -thumbnail 167x167 -alpha on -background none -flatten favicon-ipad-retina-167.ico
magick  logo.fw.png -thumbnail 180x180 -alpha on -background none -flatten favicon-iphone-retina-180.ico
magick  logo.fw.png -thumbnail 192x192 -alpha on -background none -flatten favicon-google-manifest-192.ico
magick  logo.fw.png -thumbnail 196x196 -alpha on -background none -flatten favicon-android-home-196.ico
magick  logo.fw.png -thumbnail 200x200 -alpha on -background none -flatten logo200.jpg
magick  logo.fw.png -thumbnail 200x200 -alpha on -background none -flatten logo200.gif