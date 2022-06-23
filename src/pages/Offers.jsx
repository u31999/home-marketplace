import { useEffect, useState } from "react"
import {collection, getDocs, query, where,
   orderBy, limit} from 'firebase/firestore'
import {db} from '../firebase.config'
import { toast } from "react-toastify"
import Spinners from '../component/Spinners'
import ListingItems from "../component/ListingItems"

function Offers() {
  const [listing, setLitsting] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try{
        const listRef = collection(db, 'listings')

        const q = query(listRef, where('offer', '==', true), orderBy('timestamp', 'desc')
        , limit(10))

        const querysnap = await getDocs(q)

        let listings = []

        querysnap.forEach((d) => {
          return listings.push({
            id: d.id,
            data: d.data()
          })
        })

        setLitsting(listings)
        setLoading(false)

      }catch(error) {
        toast.error('Could not fetch data')
      }
    }

    fetchListings()
  }, [])

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          Offers
        </p>
      </header>

      {loading ? (
        <Spinners />
      ) : listing && listing.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listing.map((list) => (
                <ListingItems listing={list.data} id={list.id} key={list.id} />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No Offers</p>
      )}
    </div>
  )
}

export default Offers
