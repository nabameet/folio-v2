import React from 'react';

export type ProjectImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const ProjectImage: React.FC<ProjectImageProps> = (props) => (
  <img {...props} />
); 