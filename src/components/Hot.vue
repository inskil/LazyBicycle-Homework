<template>
    <div class="head_carousel">
        <Carousel autoplay v-model="value2" :dots="setting.dots" :radius-dot="setting.radiusDot" loop>
            <CarouselItem>
                <div class="demo-carousel" align="center"><img class="head_pic" :src="head_pic.pic1"></div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel" align="center"><img class="head_pic"  :src="head_pic.pic2"></div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel" align="center"><img class="head_pic"  :src="head_pic.pic3"></div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel" align="center"><img class="head_pic"  :src="head_pic.pic4"></div>
            </CarouselItem>
        </Carousel>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                value2: 0,
                head_pic:{
                    pic1:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg",
                    pic2:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561716440.jpg",
                    pic3:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p511118051.jpg",
                    pic4:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2559011361.jpg"
                },
                setting:{
                    dots: 'outside',
                    radiusDot: true,
                }
            }
        }
    }
</script>


<style langscoped>
.head_carousel{
    top: 10px;
    left: 10%;
    width:25rem;
    max-width: 25rem;
    position: relative;
}
.head_pic{
    width: 15rem;
    height: 20rem;
    object-fit: cover;
    display: block;
}
</style>
