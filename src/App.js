import React, { useEffect, useState, useMemo } from 'react';
import './App.css'; // Assuming you have some CSS styles in this file
import { slide as Menu } from 'react-burger-menu'
import io from 'socket.io-client';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Hamburger from 'hamburger-react'
import { IoCarOutline } from "react-icons/io5"
import { CiCircleAlert } from "react-icons/ci"
import { IoCameraOutline } from "react-icons/io5";
import { PiBellRinging } from "react-icons/pi"
import { AiOutlineAlert } from "react-icons/ai"
import DropDown from './DropDown';
import Card from './Card';
import SoundPlayer from './components/SoundPlayer';
import axios from 'axios';
import SOSAlert from './components/SOSAlert';
import GoogleMapReact from 'google-map-react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Appmap from './Appmap';
function App() {

  const dummyData = [
    {
      _id: 1,
      locations: [
        [40.7128, -74.0060], // New York
        [34.0522, -118.2437], // Los Angeles
        [41.8781, -87.6298], // Chicago
      ],
      address: "New York, NY",
      time: "2024-02-16T12:30:00Z",
      type: 0,
      responsetype: ["Ambulance", "Fire", "PCR", "Drone"],
      status: true,
    },
    {
      _id: 2,
      locations: [
        [37.7749, -122.4194], // San Francisco
        [47.6062, -122.3321], // Seattle
      ],
      address: "San Francisco, CA",
      time: "2024-02-16T11:45:00Z",
      type: 1,
      status: true,
    },
    {
      _id: 3,
      locations: [
        [33.4484, -112.0740], // Phoenix
        [29.7604, -95.3698], // Houston
      ],
      address: "Phoenix, AZ",
      time: "2024-02-16T10:15:00Z",
      type: 0,
      status: false,
    },
    {
      _id: 4,
      locations: [
        [25.7617, -80.1918], // Miami
        [39.9526, -75.1652], // Philadelphia
      ],
      address: "Miami, FL",
      time: "2024-02-16T09:00:00Z",
      type: 1,
      status: true,
    },
    {
      _id: 5,
      locations: [
        [33.6844, -117.8265], // Irvine
        [32.7157, -117.1611], // San Diego
      ],
      address: "Irvine, CA",
      time: "2024-02-16T08:30:00Z",
      type: 0,
      status: false,
    },
    {
      _id: 6,
      locations: [
        [34.0522, -118.2437], // Los Angeles
        [37.7749, -122.4194], // San Francisco
      ],
      address: "Los Angeles, CA",
      time: "2024-02-16T07:45:00Z",
      type: 1,
      status: false,
    },
    {
      _id: 7,
      locations: [
        [41.8781, -87.6298], // Chicago
        [39.7684, -86.1581], // Indianapolis
      ],
      address: "Chicago, IL",
      time: "2024-02-16T06:00:00Z",
      type: 0,
      status: true,
    },
    {
      _id: 8,
      locations: [
        [33.4484, -112.0740], // Phoenix
        [32.2226, -110.9747], // Tucson
      ],
      address: "Phoenix, AZ",
      time: "2024-02-16T05:15:00Z",
      type: 1,
      status: false,
    },
    {
      _id: 9,
      locations: [
        [42.3601, -71.0589], // Boston
        [34.0522, -118.2437], // Los Angeles
      ],
      address: "Boston, MA",
      time: "2024-02-16T04:30:00Z",
      type: 0,
      status: true,
    },
    {
      _id: 10,
      locations: [
        [32.7767, -96.7970], // Dallas
        [29.7604, -95.3698], // Houston
      ],
      address: "Dallas, TX",
      time: "2024-02-16T03:45:00Z",
      type: 1,
      status: false,
    },
    {
      _id: 11,
      locations: [
        [36.7783, -119.4179], // Fresno
        [34.0522, -118.2437], // Los Angeles
      ],
      address: "Fresno, CA",
      time: "2024-02-16T03:00:00Z",
      type: 0,
      status: false,
    },
    {
      _id: 12,
      locations: [
        [40.7128, -74.0060], // New York
        [38.9072, -77.0369], // Washington, D.C.
      ],
      address: "New York, NY",
      time: "2024-02-16T02:15:00Z",
      type: 1,
      status: true,
    },
    {
      _id: 13,
      locations: [
        [34.0522, -118.2437], // Los Angeles
        [33.4484, -112.0740], // Phoenix
      ],
      address: "Los Angeles, CA",
      time: "2024-02-16T01:30:00Z",
      type: 0,
      status: true,
    },
    {
      _id: 14,
      locations: [
        [40.7128, -74.0060], // New York
        [42.3601, -71.0589], // Boston
      ],
      address: "New York, NY",
      time: "2024-02-16T00:45:00Z",
      type: 1,
      status: false,
    },
    {
      _id: 15,
      locations: [
        [33.4484, -112.0740], // Phoenix
        [32.7767, -96.7970], // Dallas
      ],
      address: "Phoenix, AZ",
      time: "2024-02-16T00:00:00Z",
      type: 0,
      status: true,
    },
    {
      _id: 16,
      locations: [
        [39.2904, -76.6122], // Baltimore
        [38.6270, -90.1994], // St. Louis
      ],
      address: "Baltimore, MD",
      time: "2024-02-15T23:15:00Z",
      type: 1,
      status: true,
    },
    {
      _id: 17,
      locations: [
        [34.0522, -118.2437], // Los Angeles
        [40.7128, -74.0060], // New York
      ],
      address: "Los Angeles, CA",
      time: "2024-02-15T22:30:00Z",
      type: 0,
      status: false,
    },
    {
      _id: 18,
      locations: [
        [37.7749, -122.4194], // San Francisco
        [47.6062, -122.3321], // Seattle
      ],
      address: "San Francisco, CA",
      time: "2024-02-15T21:45:00Z",
      type: 1,
      status: false,
    },
    {
      _id: 19,
      locations: [
        [33.4484, -112.0740], // Phoenix
        [29.7604, -95.3698], // Houston
      ],
      address: "Phoenix, AZ",
      time: "2024-02-15T21:00:00Z",
      type: 0,
      status: true,
    },
    {
      _id: 20,
      locations: [
        [41.8781, -87.6298], // Chicago
        [39.2904, -76.6122], // Baltimore
      ],
      address: "Chicago, IL",
      time: "2024-02-15T20:15:00Z",
      type: 1,
      status: true,
    },
  ];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAhuKybZek9mjXlSXBqLV70VpHa_w2yJ24"
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
  const [user_id, setuser_id] = useState("arpitverma")
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [links, setlinks] = useState([])
  const [sosdata, setSosdata] = useState(["https://adssbckend.onrender.com/getAllSOSRecord"]) // To store the data from the API 

  const [isCarDropdownOpen, setIsCarDropdownOpen] = useState(false);
  const [selectedCarOption, setSelectedCarOption] = useState(null);
  const [isCarSelected, setIsCarSelected] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [live, setLive] = useState(true);
  const [engaged, setEngaged] = useState(true);
  const [free, setFree] = useState(false);
  const [past, setPast] = useState(false);
  const [item, setItem] = useState([])
  const [cars, setCars] = useState(false);
  const [cardoption, setcardoption] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  const isImage = (link) => {
    const extension = link.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
  };
  useEffect(() => {
    if (cardoption === "Drone Frame") {
      const fetchDroneFrames = async () => {
        try {
          const response = await axios.get('https://us-east-2.aws.neurelo.com/rest/links', {
            headers: {
              'x-api-key': 'neurelo_9wKFBp874Z5xFw6ZCfvhXTU6cvK/wmtEFP8f7LrqxytWU2UVW9FJ9gSM6kgCTQe8LsBSAnvWqXxwJK15DGtP3nRgzkwfVKpoKCjadnUV5YZtCastx7++MUvyhziD+PrJQvOHsvKXCzNv6n/SVgu/RqOSDziB9KUTGfeiXuyhQCKaxMctiAbFYxpS4igqnQAJ_g1+LG7ckXbDEUVgDIBrbJ2WwfdZU2Qfe0QGHoISN7i0='
            }
          });
          setlinks(response.data.data);

        } catch (error) {
          console.error('Error fetching drone frames: ', error);
        }
      };
      // Call the function to fetch drone frames
      fetchDroneFrames();
    }
  }, [cardoption]);

  useEffect(() => {
    console.log("links", links)
  }, [links]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://adssbckend.onrender.com/admin/getAdminById?user_id=arpitverma');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval to fetch data every 3 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup function to clear interval when the component unmounts or when the effect runs again
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount



  useEffect(() => {
    // Fetch data from the API
    const fetchData2 = async () => {
      try {
        const response = await axios.get('https://adssbckend.onrender.com/sos//getAllSOSRecord');
        setSosdata(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    // Initial fetch
    fetchData2();
  }, [sosdata]);






  useEffect(() => {

    if (data.sos) {
      setFlag(true);
      triggerSOS({ flag });
    }
    else {
      setFlag(false);
      triggerSOS({ flag });
    }
  }, [data, flag])


  const [showAlert, setShowAlert] = useState(false);
  const [playSound, setPlaySound] = useState(false);

  // Function to trigger SOS alert and buzzing sound
  const triggerSOS = (f) => {
    if (f) {
      console.log("false set")
    }
    else {
      console.log("true set")
    }
    setShowAlert(f);
    setPlaySound(f);
    console.log("SOS Alert triggered!");
    // Hide alert and stop sound after 5 seconds
  };

  // To store the selected option from the dropdown

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);




  const handleVehiclesClick = () => {
    console.log("Vehicles clicked");
    setIsCarDropdownOpen(!isCarDropdownOpen);
  };

  const handleAlertClick = () => {
    console.log("Alert clicked");
    setIsCarSelected(false);
    setIsCarDropdownOpen(false);
  }

  const formattedDate = dateTime.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  useEffect(() => {
    console.log("Selected Option: ", selectedCarOption);
    console.log("the card option is ", cardoption)
  }, [selectedCarOption, cardoption]);
  return (
    <div className='bg-#1A262F'>






      <div className='flex items-center bg-[#222580] mb-3'>
        <img src={require('./adsslogo.svg').default} className="image ms-10 imgborder" alt="logo" />
        <div className='flex flex-col grow align-center justify-center ms-10'>
          <div className='flex text-white '>Advanced Drone Survelliance System</div>
          <div className='flex text-white'>ADSS - Gandhinagar Police Station ,456789</div>
        </div>
        <div className='flex flex-col date-time marginend'>
          <div className=' mx-9 text-white'>{formattedDate}</div>
          <div className=' mx-9 text-white'>{formattedTime}</div>
        </div>
      </div>
      <div className='flex pad_bot '>
        <div className='flex flex-col height80 gap-12 px-1 alignment bg-[#000d0c] border-r-1 rounded-r-md'>
          <Hamburger size={24} color='white' />
          <AiOutlineAlert size={24} className='pointer' color='red' onClick={handleAlertClick} />
          <div className='flex gap-2'

          >
            <IoCarOutline size={24} className='pointer' color='white' onClick={handleVehiclesClick} />
            {(isCarDropdownOpen) &&
              <DropDown
                className="your-class-name"
                options={['Ambulance', 'Fire', 'PCR']}
                selectedOption={selectedCarOption}
                setSelectedOption={setSelectedCarOption}
                setIsCarDropdownOpen={setIsCarDropdownOpen}
                setIsCarSelected={setIsCarSelected}
              />
            }
          </div>
          <IoCameraOutline size={24} className='pointer' color='white' />
          <PiBellRinging size={24} className='pointer' color='white' />
          <SoundPlayer flag={flag} />
        </div>
        {(!isCarSelected) && <div className='flex flex-col bg-[#000d0c]  rounded-md border-1 width-height ms-2'>
          <div className='flex bg-[#000d0c] rounded-md '>
            <div className='px-3 py-1 bottom-border border-right flex-1 width justify-center text-center pointer text-white'
              onClick={() => {
                setLive(true);
                setPast(false);
              }}>Live</div>
            <div className='px-3 py-1 bottom-border flex-1 justify-center text-center pointer text-white'
              onClick={() => {
                setLive(false);
                setPast(true);
              }}>Past</div>
          </div>
          <Card data={sosdata} setcardoption={setcardoption} setItem={setItem} />
        </div>}


        {(isCarSelected) && <div className='flex flex-col bg-[#000d0c]  rounded-md border-1 width-height ms-2'>
          <div className='flex bg-[#000d0c] rounded-md '>
            <div className='px-3 py-1 bottom-border border-right flex-1 width justify-center text-center pointer text-white'
              onClick={() => {
                setEngaged(true);
                setFree(false);
              }}>Engagged</div>
            <div className='px-3 py-1 bottom-border flex-1 justify-center text-center pointer text-white'
              onClick={() => {
                setEngaged(false);
                setFree(true);
              }}>Free</div>
          </div>
        </div>
        }



        <div className='flex flex-col bg-[#000d0c]  rounded-md border-1 height80 flex-1 mx-2'>

          <div>
            <SOSAlert showAlert={flag} setFlag={setFlag} user_id={user_id} />
          </div>

          {cardoption === "" &&
            <div className='h70'>
              <img src={require('./logo3.svg').default} className='default_img rounded-md' />
            </div>
          }


          {cardoption === "Details" &&
            <>
              <div className='flex text-center justify-center bottom-border py-1 text-white'>
                SOS ALERT NAME - ID
              </div>
              <div className='flex gap-6 p-6'>
                <div className='flex flex-col flex-1 bg-[#151329] rounded-lg height65 p-2 gap-8 text-white detail_class'>
                  <div className='p-2 mb-4 headerfont text-white'>SOS Details</div>
                  <div className='text-white'>Time:{item.time}</div>
                  <div className='text-white'>Type:{item.sos_type}</div>
                  <div className='text-white'>Location:{item.current_address}</div>
                  <div className='text-white'>Status: {item.status ? 1 : 0}</div>

                </div>
                {/* <div className='flex flex-col flex-1 bg-[#151329] rounded-lg height65 p-2 text-white'>hi</div> */}
              </div>
            </>
          }




          {cardoption === "Vehicle" &&
            <>
              <div className='flex text-center  bottom-border'>
                <div className='border-right px-6 py-1 flex item-center justify-center text-center flex-1 text-white'>PCR</div>
                <div className=' py-1 flex item-center justify-center text-center flex-1 text-white'>Ambulance</div>
                <div className='border-left  py-1 flex item-center justify-center text-center flex-1 text-white'>Firefighters</div>
              </div>
              <div className='flex gap-6 p-6'>
                <div className='flex flex-col flex-1 bg-[#151329] rounded-lg height65 p-2 gap-8 text-white'>
                  <div className='p-2 mb-4 headerfont text-white'>Vehicles Details</div>
                  <div className='text-white'>Total allocated</div>
                  <div className='text-white'>Location</div>

                </div>

              </div>
            </>
          }




          {cardoption === "Drone" &&
            <>
              <div className='flex text-center justify-center bottom-border py-1 text-white'>
                SOS ALERT NAME - ID
              </div>
              <div className='flex gap-6 p-6'>
                <div className='flex flex-col flex-1 bg-[#151329] rounded-lg height65 p-2 gap-8 text-white'>
                  <div className='p-2 mb-4 headerfont text-white'>Drones allocated</div>
                  <div className='text-white'>Total allocated</div>
                  <div className='text-white'>Location</div>
                </div>

              </div>
            </>
          }





          {cardoption === "Drone Frame" &&
            <>
              <div className='flex text-center justify-center bottom-border py-1 text-white'>
                SOS ALERT NAME - ID
              </div>
              <div className='flex gap-6 p-6'>
                <div className='flex flex-col flex-1 bg-[#151329] rounded-lg height65 p-2 gap-2 text-white'>
                  <div className='p-2 mb-4 headerfont text-white'>Drone Frames</div>
                  <div className='flex flex-col flex-1 bg-[#151329] rounded-lg height50 p-2 gap-8 text-white'>
                    {links.length > 0 && (
                      <div className="flex flex-col bg-[#000d0c] rounded-md border-1 height80 flex-1 mx-2 detail_class">
                        <div className="p-2 mb-4 headerfont text-white">Clickable Links</div>
                        <div className="flex flex-col gap-2 justify-center">
                          <div className="links-container flex flex-col justify-center">
                            {links.map((link, index) => (
                              <div key={index} className="flex flex-col mb-6 justify-center m-4">
                                <div className="link-container">
                                  {isImage(link.links) ? (
                                    <a
                                      href={link.links}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex flex-col justify-center"
                                    >
                                      <img src={link.links} alt={`Thumbnail ${index}`} className="thumbnail" />
                                      <span className="link-title">{link.title}</span>
                                    </a>
                                  ) : (
                                    <a
                                      href={link.links}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex flex-col justify-center"
                                    >
                                      <video controls className="thumbnail">
                                        <source src={link.links} type="video/mp4" />
                                        Your browser does not support the video tag.
                                      </video>
                                      <span className="link-title">{link.title}</span>
                                    </a>
                                  )}
                                </div>
                              </div>
                            ))}

                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </>
          }
          {cardoption === "SOS location" &&
            <div className='apps'>
              <div className='flex text-center justify-center bottom-border py-1 text-white'>
                SOS ALERT NAME - ID
              </div>
              <Appmap coordinate={item.coordinates} />
            </div>
          }

        </div>


      </div>
    </div>
  );
}

export default App;
