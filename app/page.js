'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import confetti from 'canvas-confetti'
import DiwaliWinningDialog from '@/components/dialog'

// Constants
const products = [
  {
    name: 'iPhone 15 Pro',
    description: 'The latest and greatest iPhone',
    image: 'https://img.freepik.com/premium-photo/phone-that-has-back-it-showing-back-phone_1127397-6185.jpg?ga=GA1.1.1309443915.1724494669&semt=ais_hybrid',
    details: {
      releaseYear: 2023,
      screenSize: '6.1-inch Super Retina XDR display',
      chip: 'A17 Pro chip with 6-core GPU',
      camera: '48MP Main camera with 3x optical zoom, Night mode, and Deep Fusion',
      batteryLife: 'Up to 23 hours of video playback',
      price: '$999',
      colors: ['Silver', 'Graphite', 'Gold', 'Sierra Blue']
    }
  },
  {
    name: 'iPhone 15',
    description: 'Powerful and sleek',
    image: 'https://img.freepik.com/premium-photo/experience-innovation-allnew-iphone-mockup_1073664-3879.jpg?ga=GA1.1.1309443915.1724494669&semt=ais_hybrid',
    details: {
      releaseYear: 2023,
      screenSize: '6.1-inch Liquid Retina display',
      chip: 'A16 Bionic chip with 5-core GPU',
      camera: '12MP Main camera with Smart HDR 4 and Portrait mode',
      batteryLife: 'Up to 20 hours of video playback',
      price: '$799',
      colors: ['Blue', 'Red', 'Green', 'White', 'Black']
    }
  },
  {
    name: 'iPhone 14',
    description: 'Still amazing',
    image: 'https://img.freepik.com/premium-photo/silver-iphone-with-camera-back-it_1022212-18768.jpg?ga=GA1.1.1309443915.1724494669&semt=ais_hybrid',
    details: {
      releaseYear: 2022,
      screenSize: '6.1-inch Super Retina XDR display',
      chip: 'A15 Bionic chip with 4-core GPU',
      camera: 'Dual 12MP cameras with Night mode and 4K video recording',
      batteryLife: 'Up to 19 hours of video playback',
      price: '$699',
      colors: ['Midnight', 'Starlight', 'Product(RED)', 'Blue', 'Purple']
    }
  },
  {
    name: 'MacBook Pro',
    description: 'For the professionals',
    image: 'https://img.freepik.com/premium-photo/beautiful-macbook-wallpapers-every-style_1199394-48726.jpg?ga=GA1.1.1309443915.1724494669&semt=ais_hybrid',
    details: {
      releaseYear: 2023,
      screenSize: '14-inch or 16-inch Liquid Retina XDR display',
      chip: 'M2 Pro or M2 Max chip with up to 12-core CPU and 38-core GPU',
      camera: '1080p FaceTime HD camera',
      batteryLife: 'Up to 18 hours of battery life',
      price: 'Starting at $1999',
      colors: ['Space Gray', 'Silver']
    }
  }
]

const spinItems = ['iPhone 15 Pro', 'iPhone 15', 'iPhone 14', 'Bad Luck', 'Bad Luck', 'MacBook Pro']
const segColors = ['#FFA500', '#FF6347', '#FFD700', '#FF4500', '#FF8C00', '#FF7F50']

const diwaliQuotes = [
  "May the festival of lights brighten your life and bring you joy, prosperity, and happiness. Happy Diwali!",
  "Let the light of the diyas guide you towards peace and prosperity. Happy Diwali!",
  "Wishing you a Diwali that brings happiness, prosperity, and joy to you and all your family.",
  "May the divine light of Diwali spread into your life peace, prosperity, happiness, and good health.",
  "On this auspicious occasion, may joy, prosperity, and happiness illuminate your life and your home.",
]

const WheelComponent = ({
  segments,
  segColors,
  winningSegment,
  onFinished,
  primaryColor = "black",
  contrastColor = "white",
  buttonText = "Spin",
  isOnlyOnce = true,
  size = 290,
  upDuration = 100,
  downDuration = 1000,
  fontFamily = "proxima-nova"
}) => {
  let currentSegment = "";
  let isStarted = false;
  const [isFinished, setFinished] = useState(false);
  const [dynamicSize, setDynamicSize] = useState(290);
  let timerHandle = 0;
  const timerDelay = segments.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  let canvasContext = null;
  let maxSpeed = Math.PI / segments.length;
  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;
  let spinStart = 0;
  let frames = 0;
  const centerX = dynamicSize;
  const centerY = dynamicSize;

  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
    const handleResize = () => {
      const width = window.innerWidth;
      const newSize = width < 768 ? Math.min(width - 40, 290) : 290;
      setDynamicSize(newSize);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = () => {
    let canvas = document.getElementById("canvas");
    if (navigator.userAgent.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", dynamicSize * 2);
      canvas.setAttribute("height", dynamicSize * 2);
      canvas.setAttribute("id", "canvas");
      document.getElementById("wheel").appendChild(canvas);
    }
    canvas.addEventListener("click", spin, false);
    canvasContext = canvas.getContext("2d");
  };

  const spin = () => {
    isStarted = true;
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      maxSpeed = Math.PI / segments.length;
      frames = 0;
      timerHandle = setInterval(onTimerTick, timerDelay);
    }
  };

  const onTimerTick = () => {
    frames++;
    draw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;
    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (winningSegment) {
        if (currentSegment === winningSegment && frames > segments.length) {
          progress = duration / upTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        angleDelta =
          maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }

      if (progress >= 1) finished = true;
    }

    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
    if (finished) {
      setFinished(true);
      onFinished(currentSegment);
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
    }
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawSegment = (key, lastAngle, angle) => {
    const ctx = canvasContext;
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, dynamicSize - 10, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColors[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor;
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillText(value.substr(0, 21), dynamicSize / 2 + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em " + fontFamily;
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw a center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor;
    ctx.lineWidth = 10;
    ctx.strokeStyle = contrastColor;
    ctx.fill();
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillStyle = contrastColor;
    ctx.textAlign = "center";
    ctx.fillText(buttonText, centerX, centerY + 3);
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, dynamicSize - 10, 0, PI2, false);
    ctx.closePath();

    ctx.lineWidth = 10;
    ctx.strokeStyle = primaryColor;
    ctx.stroke();
  };

  const drawNeedle = () => {
    const ctx = canvasContext;
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor;
    ctx.fileStyle = contrastColor;
    ctx.beginPath();
    ctx.moveTo(centerX + 20, centerY - 50);
    ctx.lineTo(centerX - 20, centerY - 50);
    ctx.lineTo(centerX, centerY - 70);
    ctx.closePath();
    ctx.fill();
    const change = angleCurrent + Math.PI / 2;
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1;
    if (i < 0) i = i + segments.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = primaryColor;
    ctx.font = "bold 1.5em " + fontFamily;
    currentSegment = segments[i];
    isStarted &&
      ctx.fillText(currentSegment, centerX + 10, centerY + dynamicSize + 50);
  };

  const clear = () => {
    const ctx = canvasContext;
    ctx.clearRect(0, 0, dynamicSize * 2, dynamicSize * 2);
  };

  return (
    <div id="wheel" className="flex justify-center items-center p-4 bg-[#FEF9C4] w-full">
      <canvas
        id="canvas"
        width={dynamicSize * 2}
        height={dynamicSize * 2}
        style={{
          width: dynamicSize,
          height: dynamicSize,
          pointerEvents: isFinished && isOnlyOnce ? "none" : "auto"
        }}
      />
    </div>
  );
};

function Header() {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        <a href="#" className="text-3xl font-bold mb-4 sm:mb-0">Diwali Giveaway Spinner</a>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-yellow-200 transition duration-300">Home</a></li>
            <li><a href="#products" className="hover:text-yellow-200 transition duration-300">Products</a></li>
            <li><a href="#comments" className="hover:text-yellow-200 transition duration-300">Comments</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-800 to-red-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Diwali Giveaway Spinner</h3>
            <p>Experience the thrill of winning amazing products this Diwali!</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-200 transition duration-300">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-yellow-200 transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-200 transition duration-300">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-200 transition duration-300">Facebook</a>
              <a href="#" className="hover:text-yellow-200 transition duration-300">Twitter</a>
              <a href="#" className="hover:text-yellow-200 transition duration-300">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 Diwali Giveaway Spinner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function Ad({ position }) {
  return (
    <div className={`bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg shadow-md text-center ${position === 'sidebar' ? 'h-auto' : 'h-auto'}`}>
      <h3 className="text-2xl font-bold mb-2 text-orange-800">Diwali Special Offer!</h3>
      <p className="text-lg text-orange-700 mb-4">Celebrate the festival of lights with amazing deals!</p>
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">
        Shop Now
      </button>
    </div>
  )
}

function ProductList({ products }) {
  return (
    <section id="products" className="my-12 px-4 md:px-8 lg:px-12 border">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-orange-800">
        Diwali Giveaway Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
              className="w-full h-56 md:h-64 object-cover"
            />
            <div className="p-4 md:p-6 space-y-2">
              <h3 className="text-lg md:text-xl font-semibold text-orange-700">
                {product.name}
              </h3>
              <p className="text-sm md:text-base text-orange-600">
                {product.description}
              </p>
              <div className="text-xs md:text-sm text-gray-600 space-y-1">
                <p><strong>Release Year:</strong> {product.details.releaseYear}</p>
                <p><strong>Screen:</strong> {product.details.screenSize}</p>
                <p><strong>Chip:</strong> {product.details.chip}</p>
                <p><strong>Camera:</strong> {product.details.camera}</p>
                <p><strong>Battery:</strong> {product.details.batteryLife}</p>
                <p><strong>Price:</strong> {product.details.price}</p>
                <p><strong>Colors:</strong> {product.details.colors.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CommentSection() {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [newRating, setNewRating] = useState(0)

  useEffect(() => {
    const storedComments = localStorage.getItem('comments')
    if (storedComments) {
      setComments(JSON.parse(storedComments))
    }
  }, [])

  const addComment = () => {
    if (newComment && newRating > 0) {
      const comment = {
        id: Date.now(),
        name: 'Anonymous',
        content: newComment,
        rating: newRating,
      }
      const updatedComments = [...comments, comment]
      setComments(updatedComments)
      localStorage.setItem('comments', JSON.stringify(updatedComments))
      setNewComment('')
      setNewRating(0)
    }
  }

  return (
    <section id="comments" className="my-12">
      <h2 className="text-4xl font-bold mb-8 text-center text-orange-800">Giveaway Feedback</h2>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your Diwali giveaway experience..."
            className="w-full px-4 py-3 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-orange-800"
            rows={4}
          ></textarea>
          <div className="flex items-center mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-8 w-8 cursor-pointer ${
                    star <= newRating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => setNewRating(star)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <button
              onClick={addComment}
              className="ml-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white p-6 rounded-lg shadow border border-orange-200 mb-4 animate-fadeIn"
          >
            <div className="flex items-center mb-2">
              <span className="font-semibold mr-2 text-orange-700">{comment.name}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-5 w-5 ${
                      star <= comment.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-orange-600">{comment.content}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ weeks: 0, days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    const targetDate = new Date("October 31, 2024 00:00:00").getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      const weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7))
      const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

      setTimeLeft({ weeks, days, hours, minutes })

      if (distance < 0) {
        clearInterval(interval)
        setTimeLeft({ weeks: 0, days: 0, hours: 0, minutes: 0 })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 bg-orange-50 text-center rounded-lg shadow-md border border-orange-300 space-y-4">
      <h3 className="text-2xl font-bold text-orange-800">Countdown to Diwali</h3>
      <div className="flex justify-center space-x-8 text-orange-700">
        {['Weeks', 'Days', 'Hours', 'Minutes'].map((unit) => (
          <div key={unit} className="flex flex-col items-center">
            <span className="text-4xl font-bold">{timeLeft[unit.toLowerCase()]}</span>
            <span className="text-sm">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


export default function GiveawayPage() {
  const [user, setUser] = useState(null)
  const [winner, setWinner] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showWinningDialog, setShowWinningDialog] = useState(false)
  const [showBadLuckDialog, setShowBadLuckDialog] = useState(false)
  const [engagementPrompt, setEngagementPrompt] = useState(null)
  const [spinsLeft, setSpinsLeft] = useState(3)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedWinner = localStorage.getItem('winningProduct')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    if (storedWinner) {
      setWinner(storedWinner)
    }

    const engagementMessages = [
      "Happy Diwali! Spin the wheel for a chance to win amazing prizes!",
      "Don't forget to check out our product showcase below!",
      "Share your experience in the comments section!",
      "Feeling lucky? Give the wheel another spin!",
      "Explore all our Diwali special offers!"
    ]

    let messageIndex = 0
    const engagementInterval = setInterval(() => {
      setEngagementPrompt(engagementMessages[messageIndex])
      messageIndex = (messageIndex + 1) % engagementMessages.length
    }, 5000)

    return () => clearInterval(engagementInterval)
  }, [])

  const handleSpin = (result) => {
    setSpinsLeft(prevSpins => prevSpins - 1)
    if (result !== 'Bad Luck') {
      setWinner(result)
      setShowConfetti(true)
      setShowWinningDialog(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      setTimeout(() => setShowConfetti(false), 5000)
    } else {
      setShowBadLuckDialog(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-100 to-yellow-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-orange-800">Diwali Giveaway Extravaganza!</h1>
          <p className="text-2xl mb-6 text-orange-700">Spin the wheel for a chance to win amazing prizes this Diwali!</p>
          {user && <p className="text-xl font-semibold text-orange-600">Welcome back, {user.name}!</p>}
          {winner && <p className="text-xl font-semibold mt-2 text-orange-600">{"You've "} won a {winner}! Check your email for details.</p>}
          <p className="text-xl font-semibold mt-2 text-orange-600">Spins remaining: {spinsLeft}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="mb-12">
              <WheelComponent
                segments={spinItems}
                segColors={segColors}
                winningSegment={winner}
                onFinished={(winner) => handleSpin(winner)}
                primaryColor="orange"
                contrastColor="white"
                buttonText="Spin"
                isOnlyOnce={false}
                size={290}
                upDuration={100}
                downDuration={1000}
              />
            </div>
            <ProductList products={products} />
            <CommentSection />
          </div>
          <div className="lg:w-1/3 space-y-8">
            <Ad position="sidebar" />
            <div className="bg-white p-6 rounded-lg shadow-md border border-orange-200">
              <h3 className="text-2xl font-bold mb-4 text-orange-800">Diwali Quote of the Day</h3>
              <p className="text-orange-700 italic">{diwaliQuotes[Math.floor(Math.random() * diwaliQuotes.length)]}</p>
            </div>
            <CountdownTimer />
            <div className="bg-white p-6 rounded-lg shadow-md border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800">Diwali Recipe of the Day</h3>
              <p className="text-orange-600 mt-2">Try making some delicious Gulab Jamun this Diwali! These sweet, syrupy balls are a festive favorite.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800">Facts about Diwali</h3>
              <ul className="list-disc list-inside text-orange-600 mt-2 space-y-1">
                <li>Diwali is also known as the Festival of Lights.</li>
                <li>The festival typically lasts five days.</li>
                <li>People clean and decorate their homes for Diwali.</li>
              </ul>
            </div>
          </div>
        </div>

        <DiwaliWinningDialog
          isOpen={showWinningDialog} 
          prize={winner} 
          onClose={() => setShowWinningDialog(false)} 
        />

        {/* <Dialog open={showBadLuckDialog} onOpenChange={setShowBadLuckDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Better luck next time!</DialogTitle>
              <DialogDescription>
                Don't worry, you still have {spinsLeft} spin{spinsLeft !== 1 ? 's' : ''} left. Keep trying for a chance to win amazing prizes!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setShowBadLuckDialog(false)}>Try Again</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}

        {engagementPrompt && (
          <div className="fixed bottom-4 right-4 bg-orange-500 text-white p-4 rounded-lg shadow-lg max-w-sm animate-slideIn">
            {engagementPrompt}
          </div>
        )}
      </main>
      <Ad position="footer" />
      <Footer />
    </div>
  )
}