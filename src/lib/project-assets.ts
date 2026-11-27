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
    githubUrl: "https://github.com/dando90/counter",
    demoUrl: "/projects/counter/",
  }),
  bookFinder: defineProjectAsset({
    image: "/images/projects/book-finder.svg",
    githubUrl: "https://github.com/dando90/bookfinder",
    demoUrl: "/projects/bookfinder/",
  }),
  phpRestApi: defineProjectAsset({
    image: "/images/projects/php-rest-api.svg",
    githubUrl: "https://github.com/dando90/apirest-php",
    demoUrl: "/projects/apirest-php/demo",
  }),
  reactNyTimesClone: defineProjectAsset({
    image: "/images/projects/react-ny-times-clone.svg",
    githubUrl: "https://github.com/dando90/nytimesclone",
    demoUrl: "/projects/nytimesclone/",
  }),
  personalWebsiteV1: defineProjectAsset({
    image: "/images/projects/personal-website-v1.svg",
    githubUrl: "https://github.com/dando90/personal-website-v1",
    demoUrl: "/projects/personal-website-v1/",
  }),
  personalWebsiteV2: defineProjectAsset({
    image: "/images/projects/personal-website-v2.svg",
    githubUrl: "https://github.com/dando90/personal-website-v2",
  }),
  driveSync: defineProjectAsset({
    image: "/images/projects/drivesync.svg",
    githubUrl: "https://github.com/dando90/drive-sync",
  }),
  hostList: defineProjectAsset({
    image: "/images/projects/hostlist.svg",
    githubUrl: "https://github.com/dando90/hostlist-local",
    demoUrl: "/projects/hostlist-server/",
  }),
};

export type ProjectId = keyof typeof projectAssets;
