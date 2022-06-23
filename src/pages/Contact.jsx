import { useState, useEffect } from "react"
import {useParams, useSearchParams} from 'react-router-dom'
import {doc, getDoc} from 'firebase/firestore'
import { db } from "../firebase.config"
import { toast } from "react-toastify"

function Contact() {
    const [message, setMessage] = useState('')
    const [owner, setOwner] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const params = useParams()

    useEffect(() => {
        const getOwner = async () => {
            const docRef = doc(db, 'users', params.ownerId)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                setOwner(docSnap.data())
            } else {
                toast.error('Could not get owner contact info')
            }
        }

        getOwner()
    }, [params.ownerId])

    const onChange = (e) => setMessage(e.target.value)

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Owner</p>

        {owner !== null && (
            <main>
                <div className="contactLandLord">
                    <p className="landLordName">Contact {owner?.name}</p>
                </div>

                <form className="messageForm">
                    <div className="messageDiv">
                        <label htmlFor="message" className="messageLabel">
                            Message
                        </label>
                        <textarea name="message" id="message" className="textarea"
                        value={message} onChange={onChange} />
                    </div>
                    <a href={`mailto:${owner.email}?Subject=${searchParams.get('listingName')}&bod=${message}`}>
                        <button type="button" className="primaryButton">Send Message</button>
                    </a>
                </form>
            </main>
        )}
      </header>
    </div>
  )
}

export default Contact
