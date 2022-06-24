import { useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {collection, getDocs, query, orderBy, limit} from 'firebase/firestore'
import {db} from '../firebase.config'
import Spinners from "./Spinners"
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'

function Slider() {

    const  [loading, setLoading] = useState(true)
    const [listing, setListing] = useState(null)
    const navigate = useNavigate()

    useEffect(()=> {
       const fetchListing = async () => {
         const listingRef = collection(db, 'listings')
        const q = query(listingRef, orderBy('timestamp', 'desc'), limit(10))
        const querySnap = await getDocs(q)
        let listings = []

        querySnap.forEach((doc) => {
            return listings.push({
                id: doc.id,
                data: doc.data()
            })
        })
        setListing(listings)
        setLoading(false)
       }
       fetchListing()
    }, [])

    if(loading) return <Spinners />

  return  listing && (
    <>
        <p className="exploreHeading">Recomended</p>
        <Swiper 
        style={{height: '17rem'}}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={{delay: 5000}}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}>
            {listing.map((list) => (
                <SwiperSlide key={list.id}
                onClick={()=> navigate(`/category/${list.data.type}/${list.id}`)}>
                    <div className="swiperSlideDiv"
                    style={
                        {background: `url(${list.data.imageUrls[0]}) center no-repeat`,
                         backgroundSize: 'cover'}}>
                        <p className="swiperSlideText">{list.data.name}</p>
                        <p className="swiperSlidePrice">
                            ${list.data.discountedPrice ?? list.data.regularPrice}
                            {' '}{list.data.type === 'rent' && '/ month'}
                        </p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </>
    
  )
}

export default Slider
