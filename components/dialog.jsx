import React, { useState } from 'react'
import { Facebook, Twitter, Instagram, Linkedin, Link, Mail } from 'lucide-react'

export default function DiwaliWinningDialog({ isOpen, onClose, prize }) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleShare = (platform) => {
    // Implement sharing logic here
    console.log(`Shared on ${platform}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://yourdomain.com/share?prize=${encodeURIComponent(prize)}`)
    alert('Link copied to clipboard!')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg shadow-xl max-w-md w-full p-6 border-2 border-orange-500">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-orange-800 mb-2">🪔 Diwali Delight! 🪔</h2>
          <p className="text-orange-700">Your Diwali just got brighter! {"You've"} won a {prize}!</p>
        </div>
        <div className="bg-white bg-opacity-50 rounded-lg shadow-inner p-4">
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Next
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin', 'whatsapp'].map((platform) => (
                  <button
                    key={platform}
                    onClick={() => handleShare(platform)}
                    className={`p-2 rounded-full text-white ${
                      platform === 'facebook' ? 'bg-blue-600 hover:bg-blue-700' :
                      platform === 'twitter' ? 'bg-sky-500 hover:bg-sky-600' :
                      platform === 'instagram' ? 'bg-pink-600 hover:bg-pink-700' :
                      platform === 'linkedin' ? 'bg-blue-700 hover:bg-blue-800' :
                      'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {platform === 'facebook' ? <Facebook className="w-5 h-5" /> :
                     platform === 'twitter' ? <Twitter className="w-5 h-5" /> :
                     platform === 'instagram' ? <Instagram className="w-5 h-5" /> :
                     platform === 'linkedin' ? <Linkedin className="w-5 h-5" /> :
                     <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                     </svg>
                    }
                  </button>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={`https://yourdomain.com/share?prize=${encodeURIComponent(prize)}`}
                  readOnly
                  className="flex-grow mr-2 px-3 py-2 border border-orange-300 rounded-md bg-white"
                />
                <button
                  onClick={handleCopyLink}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md"
                >
                  <Link className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={() => handleShare('email')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300"
              >
                <Mail className="w-5 h-5 mr-2" /> Share via Email
              </button>
            </div>
          )}
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-orange-500 text-orange-700 rounded hover:bg-orange-100 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}