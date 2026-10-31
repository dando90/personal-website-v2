type ProjectAsset = {
  image: string;
  githubUrl: string;
  demoUrl?: string;
};

function defineProjectAsset(asset: ProjectAsset): ProjectAsset {
  return asset;
}

export const projectAssets = {
  counterJavaScript: defineProjectAsset({
    image: "/images/projects/counter-javascript.svg",
    githubUrl:
      "https://github.com/dando90/dando90.github.io/tree/main/portfolio/javascript_basics",
    demoUrl: "https://www.stefanochiabrando.com/portfolio/counter/",
  }),
  bookFinder: defineProjectAsset({
    image: "/images/projects/book-finder.svg",
    githubUrl:
      "https://github.com/dando90/dando90.github.io/tree/main/portfolio/bookfinder",
    demoUrl: "https://www.stefanochiabrando.com/portfolio/bookfinder/",
  }),
  phpRestApi: defineProjectAsset({
    image: "/images/projects/php-rest-api.svg",
    githubUrl:
      "https://github.com/dando90/dando90.github.io/tree/main/portfolio/apirest",
  }),
  reactNyTimesClone: defineProjectAsset({
    image: "/images/projects/react-ny-times-clone.svg",
    githubUrl: "https://github.com/dando90/nytimesclone",
    demoUrl: "https://www.stefanochiabrando.com/portfolio/nytimesclone/",
  }),
};

export type ProjectId = keyof typeof projectAssets;
