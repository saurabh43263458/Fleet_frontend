import React, { useState, useEffect } from 'react'
import Input from "../Components/input"

import { useGSAP } from "@gsap/react";
import 'remixicon/fonts/remixicon.css'
import LiveTracking from '../Components/LiveTracking';
import gsap from 'gsap';
import LocationPanel from '../Components/LocationPanel';
import Vehicletype from '../Components/Vehicletype';
import ConfirmedVehicle from '../Components/ConfirmedVehicle';
import Lookingfordriver from '../Components/Lookingfordriver';
import axios from 'axios';
import { SocketContext } from '../ContextApi/SocketContext';
import { useContext } from 'react';
import { UserContext } from '../ContextApi/userContextapi';
import {useNavigate} from 'react-router-dom';
import WaitingForDriver from '../Components/WaitingForDriver';
const Start = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [panel, setpanel] = useState(false);
  const panelRef = React.useRef(null);
  const panelIconRef = React.useRef(null);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const vehicletypeRef = React.useRef(null);
  const [confirmedvehicle, setConfirmedVehicle] = useState(false);
  const confirmedvehicleRef = React.useRef(null);
  const [choosevehicle, setChooseVehicle] = useState({});
  const vehiclefoundRef = React.useRef(null);
  const [vehiclefound, setVehicleFound] = useState(false);
 const [ waitingForDriver, setWaitingForDriver ] = useState(false)
  const waitingForDriverRef =React.useRef(null)
  const [image, setImage] = useState("");
  const [ ride, setRide ] = useState(null)
  // New state for location suggestions and active input
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null); // 'pickup' or 'drop'

  const [allFares, setAllFares] = useState({});
  // Fetch all fares when pickup or drop changes
  const [shouldFetchFare, setShouldFetchFare] = useState(false);
 const [fare, setfare] = useState({})
 const { socket } = useContext(SocketContext)
 const { user } = useContext(UserContext)
  const navigate =useNavigate();
   useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })
    }, [ user ])
 socket.on('ride-confirmed', ride => {

 setRide(ride)
        setVehicleFound(false)
        setWaitingForDriver(true)
       
    })

 console.log("ride", ride);
    socket.on('ride-started', ride => {
        console.log("hello" +ride)
        setWaitingForDriver(false)
       navigate('/riding', { state: { ride } })
    })
  // Fetch suggestions when pickup or drop changes and panel is open
  useEffect(() => {
  let query = "";
  if (panel && activeInput === "pickup" && pickup.length > 0) {
    query = pickup;
  } else if (panel && activeInput === "drop" && drop.length > 0) {
    query = drop;
  } else {
    setLocationSuggestions([]);
    return;
  }
  console.log("Fetching suggestions for:", query);
  const fetchSuggestions = async () => {
    try {
      console.log("Fetching suggestions for:", query);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: query },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log("Response:", res.data);
      setLocationSuggestions(res.data.suggestions || []);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setLocationSuggestions([]);
    }
  };

  fetchSuggestions();
}, [pickup, drop, panel, activeInput]);


const handleSuggestionClick = (suggestion) => {
  if (activeInput === "pickup") {
    setPickup(suggestion);
    setActiveInput("pickup");
  } else if (activeInput === "drop") {
    setDrop(suggestion);
     setActiveInput("drop");
  }

  setActiveInput(null);
  setLocationSuggestions([]);
};


const submithandler = (e) => {
  e.preventDefault();

  if (!pickup || !drop) {
    alert("Please enter both pickup and drop locations.");
    return;
  }

  console.log("Pickup:", pickup, "Drop:", drop);
  setpanel(false);
  setvehiclePanel(true);

  // Only now fetch fare
  setShouldFetchFare(true);
};


useEffect(() => {
  if (!shouldFetchFare || !pickup || !drop) return;

  const fetchAllFares = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
        params: {
          pickup: pickup,
          destination: drop,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log("Fare prices:", res.data);
      setAllFares(res.data.fares || {});
    } catch (err) {
      console.error("Error fetching fare prices:", err);
      setAllFares({});
    } finally {
      setShouldFetchFare(false); // Reset after fetch
    }
  };

  fetchAllFares();
}, [shouldFetchFare, pickup, drop]);

async function createRide() {
  if (!pickup || !drop || !choosevehicle) {
    alert("Please enter pickup, drop locations and choose a vehicle.");
    return;
  }
  try {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create`, {
      pickup,
      destination: drop,
      vehicleType: choosevehicle.name,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    console.log("Ride created successfully:", res.data);
    // Handle success (e.g., navigate to ride details page)
  } catch (err) {
    console.error("Error creating ride:", err);
    alert("Failed to create ride. Please try again.");
  }
}

  useGSAP(() => {
    if (panel) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
        duration: 0.5,
      })
      gsap.to(panelIconRef.current, {
        opacity: 1,
        duration: 0.3,
      })
    }
    else {
      gsap.to(panelRef.current, {
        height: "0%",
         padding: 0,
      })
      gsap.to(panelIconRef.current, {
        opacity: 0,
      })
    }
  }, [panel])
  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehicletypeRef.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(vehicletypeRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }
    , [vehiclePanel])
  useGSAP(() => {
    if (confirmedvehicle) {
      gsap.to(confirmedvehicleRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(confirmedvehicleRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmedvehicle])
  useGSAP(() => {
    if (vehiclefound) {
      gsap.to(vehiclefoundRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(vehiclefoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclefound])
  useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ waitingForDriver ])
    
  return (
    <div className='h-screen relative '>
            
            <div className='h-screen w-screen'>
                
                <LiveTracking />
            </div>
      <div className='flex flex-col justify-end h-screen absolute bottom-0  w-full '>
        <div className="bg-white h-[40%] py-5 px-5 rounded-t-3xl">
          <h5 ref={panelIconRef} onClick={() => setpanel(false)} className=' absolute top-2 right-2 opacity-0 cursor-pointer'><i className="ri-arrow-down-s-line"></i></h5>
          <h4 className=" text-2xl font-semibold ">Find Your Trip</h4>
         <form className="bg-white p-4 " onSubmit={submithandler}>
  <div className="flex">
    {/* LEFT: Icons + Dotted Line */}
    <div className="flex flex-col items-center">
      {/* Pickup Circle */}
      <div className="w-3 h-3 border-2 border-green-500 rounded-full mt-2"></div>
      {/* Dotted Line */}
      <div className="flex-1 border-l-2 border-dotted border-gray-400 my-1" style={{ minHeight: "32px" }}></div>
      {/* Drop Pin */}
      <i className="ri-map-pin-fill text-red-500 text-lg mb-1"></i>
    </div>

    {/* RIGHT: Inputs */}
    <div className="flex flex-col flex-1 ml-3">
      {/* Pickup */}
      <div className="mb-3">
        <label className="text-lg text-gray-500 font-semibold">PICKUP</label>
        <input
          type="text"
          placeholder="My current location"
          value={pickup}
          onChange={(e) => {
            setPickup(e.target.value);
            setActiveInput("pickup");
            setpanel(true);
          }}
          onClick={() => {
            setpanel(true);
            setActiveInput("pickup");
          }}
          className="w-full bg-transparent placeholder:text-gray-400 placeholder:text-xl text-gray-800 text-xl focus:outline-none"
        />
      </div>

      {/* Drop */}
      <div>
        <label className="text-lg text-gray-500 font-semibold">DROP-OFF</label>
        <input
          type="text"
          placeholder="Enter drop location"
          value={drop}
          onChange={(e) => {
            setDrop(e.target.value);
            setActiveInput("drop");
            setpanel(true);
          }}
          onClick={() => {
            setpanel(true);
            setActiveInput("drop");
          }}
          className="w-full bg-transparent placeholder:text-gray-400 placeholder:text-xl text-gray-800 text-xl focus:outline-none"
        />
      </div>
    </div>
  </div>

  {/* Button */}
  <button className="w-full bg-[#00B894] text-white rounded-2xl text-2xl font-bold mt-4 py-4">
    Find Rider
  </button>
</form>


          
        </div>
      <div ref={panelRef} className='bg-white h-0 '>
  {panel && (
    <LocationPanel
      suggestions={locationSuggestions}
      onSuggestionClick={handleSuggestionClick}
      activeInput={activeInput}
      setChooseVehicle={setChooseVehicle}
    />
  )}
</div>

      </div>
      <div ref={vehicletypeRef} className="fixed w-full z-9  bottom-0 translate-y-full bg-white px-3 py-10 pt-12 rounded-t-3xl'">
        <Vehicletype
          setvehicletype={setvehiclePanel}
          setConfirmedVehicle={setConfirmedVehicle}
          setChooseVehicle={setChooseVehicle}
          setImage={setImage}
          fare={allFares}
          setfare={setfare}
        />
      </div>
      <div ref={confirmedvehicleRef} className="fixed w-full z-8 bottom-0 translate-y-full bg-white px-3 ">
        <ConfirmedVehicle pickup={pickup} drop={drop} setConfirmedVehicle={setConfirmedVehicle} choosevehicle={choosevehicle} setvehiclefound={setVehicleFound} createRide={createRide} />
      </div>
      <div ref={vehiclefoundRef} className='fixed w-full bottom-0 z-7 translate-y-full bg-white px-3 py-6 pt-12'>
                <Lookingfordriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={drop}
                    fare={fare}
                    vehicleType={confirmedvehicle}
                    setVehicleFound={setVehicleFound} />
            </div>
      <div ref={waitingForDriverRef} className='fixed w-full  rounded-t-3xl z-6 bottom-0  bg-white px-3 py-6 pt-12'>
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} />
            </div>
    </div>
  )
}

export default Start