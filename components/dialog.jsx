import React, { useState } from 'react'
import { Facebook, Twitter, Linkedin, Link2, Mail,  MessageCircle as Whatsapp } from 'lucide-react'

export default function DiwaliWinningDialog({ isOpen, onClose, prize }) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleShare = (platform) => {
    const shareText = `I just won a ${prize} in the Diwali Giveaway! 🪔✨`
    const shareUrl = `https://yourdomain.com/share?prize=${encodeURIComponent(prize)}`

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`, '_blank')
        break
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank')
        break
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent('Diwali Giveaway Win!')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
        break
      default:
        console.log(`Sharing on ${platform} is not implemented`)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://giveaways4u.com/share?prize=${encodeURIComponent(prize)}`)
    alert('Link copied to clipboard!')
  }

  if (!isOpen) return null
  console.log(Facebook, Twitter, Linkedin, Link2, Mail, Whatsapp);


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
                {['facebook', 'twitter', 'linkedin', 'whatsapp'].map((platform) => (
                  <button
                    key={platform}
                    onClick={() => handleShare(platform)}
                    className={`p-2 rounded-full text-white ${
                      platform === 'facebook' ? 'bg-blue-600 hover:bg-blue-700' :
                      platform === 'twitter' ? 'bg-sky-500 hover:bg-sky-600' :
                      platform === 'linkedin' ? 'bg-blue-700 hover:bg-blue-800' :
                      'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {platform === 'facebook' ? <Facebook className="w-5 h-5" /> :
                     platform === 'twitter' ? <Twitter className="w-5 h-5" /> :
                     platform === 'linkedin' ? <Linkedin className="w-5 h-5" /> :
                     <Whatsapp className="w-5 h-5" />}
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
                  <Link2 className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={() => handleShare('email')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300"
              >
                <Mail className="w-5 h-5 mr-2" /> Share via Email
              </button>
              <button
                onClick={onClose}
                className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
