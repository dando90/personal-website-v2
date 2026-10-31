# Project image sources

Put one original image per project in this folder, using the matching slug:

- `counter-javascript.jpg`
- `book-finder.jpg`
- `php-rest-api.jpg`
- `react-ny-times-clone.jpg`

PNG, JPEG, WebP and AVIF are supported. The `predev` and `prebuild` npm hooks
create 480, 800 and 1200 pixel wide WebP variants in
`public/images/projects/`. The source is cropped to the project's 16:10 image
frame, rotated according to its metadata, and kept at its original size if it
is smaller than a requested variant.

To switch a card from its SVG placeholder to a processed image, change that
project's `image` value in `src/lib/project-assets.ts` to
`/images/projects/<slug>.webp`. The custom Next image loader selects the
generated width variant for each browser viewport. Do not edit generated WebP
files by hand.
