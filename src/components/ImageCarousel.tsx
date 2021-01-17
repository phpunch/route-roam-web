import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Button, Paper } from '@material-ui/core'
import styled from '@emotion/styled';

const Image = styled.img`
    width: 100%;
`

interface ImageCarouselInterface {
    imageUrls: string[]
}



const ImageCarousel: React.FunctionComponent<ImageCarouselInterface> = ({
    imageUrls,
}) => {
    return (
        <Carousel indicators={false} >
            {
                imageUrls.map((url, i) => <Image src={url} />)
            }
        </Carousel>
    )
}
export default ImageCarousel;