import React from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

const ProductImageZoom = ({ imageUrl }) => {
  return (
    <div>
      <InnerImageZoom
        src={imageUrl} // Small image displayed initially
        zoomSrc={imageUrl} // Larger image for zoom
        zoomType="hover" // Enables zoom on hover
        zoomPreload={true} // Preloads zoom image
        alt="Product"
      />
    </div>
  );
};

export default ProductImageZoom;
