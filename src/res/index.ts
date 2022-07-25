import images from './images';
import svgs from './svgs';
const R = {
    images,
    svgs,
};

export type ImageType = keyof typeof images;
export type SVGTypes = keyof typeof svgs;
export default R;
