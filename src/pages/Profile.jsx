import { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import {getAuth, updateProfile} from 'firebase/auth'
import {updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import ListingItems from '../component/ListingItems'

function Profile() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [listing, setListing] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const {name, email} = formData

  const navigate = useNavigate()

  useEffect(()=> {
    const fetchUserListing = async () => {
      const listingRef = collection(db, 'listings')

      const q = query(listingRef, where('userRef',
       '==', auth.currentUser.uid),
       orderBy('timestamp', 'desc')
      )

      const querySnap = await getDocs(q)

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListing(listings)
      setLoading(false)
      
    }

    fetchUserListing()

  }, [auth.currentUser.uid])

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

   const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        
        await updateDoc(userRef, {
          name
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Could not update profile details')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onDelete = async (listingId) => {
    if(window.confirm('Are you shure you want to delete this item?')){
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListing = listing.filter(list => list.id !== listingId)
      setListing(updatedListing)
      toast.success('The item is deleted!')
    }
  }

  const onEdit = (listingId) => navigate(`edit-listing/${listingId}`)
  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>
          Log Out
        </button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p className='changePersonalDetails' 
          onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
          }}>
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>
        <div className='profileCard'>
          <form>
            <input type='text' id='name' 
            className={!changeDetails ? 'profileName' : 'profileNameActive'} 
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input type='text' id='email' 
            className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} 
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>

        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='home' />
          <p>Sell or rent your house</p>
          <img src={arrowRight} alt='arrowRight' />
        </Link>

        {!loading && listing?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listing.map((list) => (
                <ListingItems key={list.id} 
                listing={list.data} 
                id={list.id}
                onDelete={() => onDelete(list.id)}
                onEdit={() => onEdit(list.id)}
                 />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  )
}

export default Profile
