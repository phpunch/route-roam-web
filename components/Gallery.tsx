import Image from 'next/image';
import Masonry from 'react-masonry-component';
import styled from '@emotion/styled';

const imgSrc = [
  'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1476900543704-4312b78632f8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1473283147055-e39c51463929?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1482192505345-5655af888cc4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1487622750296-6360190669a1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1487762640878-93a22f308284?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1489945745670-d03bda2e87ac?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1489945796694-07eba0228bc7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=200&q=80',
];

const masonryOptions = {
  gutter: 4,
  fitWidth: true,  
  columnWidth: 200,  
};

const style = {
  backgroundColor: 'tomato',
};

const ImgWrapper = styled.div`
  cursor: zoom-in;
  margin: 2px 0px;
  &:hover {
    opacity: 0.8;
  }
`;

const Gallery: React.FunctionComponent = () => {
  const handleImgClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    url: string,
  ) => {
    window.location.href = url;
  };

  const imgs = imgSrc.map((url) => {
    return (
      <ImgWrapper key={url} onClick={(e) => handleImgClick(e, url)}>
        <img style={{ display: 'block', borderRadius: '5px' }} src={url} />
      </ImgWrapper>
    );
  });
  return (
    <div style={{marginTop: '75px'}}>
      <Masonry
        // style={style}
        // className={'my-gallery-class'} // default ''
        elementType={'div'} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        // imagesLoadedOptions={imagesLoadedOptions} // default {}
      >
        {imgs}
      </Masonry>
    </div>
  );
};
export default Gallery;
