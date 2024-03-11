import React, { useState, useEffect } from "react";
import Classes from "../HeaderNew/MainHead.module.css";
import { Carousel, Modal } from "antd";

const ProductImages = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  return (
    <div>
      <div className={Classes.CatList1} style={{ width: "100%" }}>
        <div className="container" style={{ paddingLeft: "0px" }}>
          <div className={Classes.Web}>
            <div className={Classes.CarouselCards}>
              <Carousel
                autoplay
                slidesToShow={5}
                dots={false}
                centerMode={true}
                centerPadding="10px"
                className={Classes.ResponsiveCarousel}
                responsive={[
                  {
                    breakpoint: 1200,
                    settings: {
                      slidesToShow: 5, // Set the number of slides to display on tablets
                    },
                  },
                  {
                    breakpoint: 991,
                    settings: {
                      slidesToShow: 5, // Set the number of slides to display on tablets
                    },
                  },
                  {
                    breakpoint: 767,
                    settings: {
                      slidesToShow: 3, // Set the number of slides to display on mobile devices
                    },
                  },
                ]}
              >
                {props.reviewImages.map((item, index) => (
                  <div
                    key={index}
                    className={Classes.Offers}
                    onClick={() => handleImageClick(item.review_image)}
                  >
                    <img
                      className={Classes.SlideImage}
                      src={item.review_image}
                      alt={`catg-${index}`}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <Modal
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
          >
            <div className={Classes.ModalImageShow}>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="modal-img"
                  style={{ maxWidth: "100%" }}
                />
              )}
            </div>
          </Modal>
          {/* dummy carousel */}
          {/* <div className={Classes.Web}>
            <p>anasmk</p>
            <Carousel autoplay>
              <div className={Classes.carouselWeb}>
                <img />
              </div>
            </Carousel>
          </div> */}
          {/* dummy carousel */}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
