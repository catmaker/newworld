// ImageElement.tsx
import React from "react";
import styles from "@/components/main/intro.module.scss";

interface ImageElementProps {
  src: string;
  alt: string;
  className: string;
}

export const ImageElement: React.FC<ImageElementProps> = ({
  src,
  alt,
  className,
}) => {
  return (
    <div>
      <img
        className={styles[className]}
        src={src}
        alt={alt}
        draggable="false"
      />
    </div>
  );
};
