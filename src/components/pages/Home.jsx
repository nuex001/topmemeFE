import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import {
  selectStyle,
} from "../../utils/utils";
import Select from "react-select";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import { TbMoodEmptyFilled } from "react-icons/tb";
import Item from "../layouts/Item";
import { useNavigate } from "react-router-dom";

function Home() {
  const [memes, setMemes] = useState(null);
  const [filteredMemes, setFilteredMemes] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const options = [
    { value: "Ethereum", label: "Etherum" },
    { value: "Base", label: "Base" },
    { value: "polygon", label: "Polygon" },
    { value: "Solana", label: "Solana" },
    { value: "optimism", label: "Optimism" },
    { value: "avalanche", label: "Avalanche" },
    { value: "zksync", label: "zksync" },
    { value: "arbitrum", label: "Arbitrum" },
    { value: "bsc", label: "BSC" },
    { value: "BNB Smart Chain (BEP20)", label: "BNB Smart Chain (BEP20)" },
  ];

  const setSelectedOption = (e) => {
    setloading(true);
    // e.preventDefault();
    const filteredtokens = memes.filter(
      (coin) => coin.chain.toLowerCase() === e.value.toLowerCase()
    );
    setFilteredMemes(filteredtokens);
    setloading(false);
  };
  const fetchData = async () => {
    try {
      setloading(true);
      const res = await axios.get(
        "https://topmemebe-1.onrender.com/getAllCryptocurrencies/"
      );
      setMemes(res.data);
      setloading(false);
    } catch (error) {
      // console.log(error);
      setloading(false);
    }
  };
  const onSubmit = (e) =>{
    e.preventDefault();
    const selectVal= e.target.select.value;
    const addrVal= e.target.addr.value;
    console.log(selectVal,addrVal);
    if (selectVal !== "" && addrVal !== "") {
      navigate(`/tokens/${selectVal}/${addrVal}`)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home">
      <form action="" onSubmit={onSubmit}>
        <Select
          onChange={setSelectedOption}
          defaultValue={{ value: "all", label: "All" }}
          options={options}
          styles={selectStyle}
          name="select"
          className="selectInput"
        />
        <div className="inptBox">
          <input type="text" name="addr" placeholder="Token address" />
          <button>
            {" "}
            <IoSearchOutline className="icon" />
          </button>
        </div>
      </form>
      <div className="child">
        <a href="#" className="row header">
          <div className="token">
            <h1>Tokens</h1>
          </div>
          <div className="subrow">
            <h2>Adrresss</h2>
            <h2>Price</h2>
            <h2>Market Cap</h2>
            <h2>Total Supply</h2>
          </div>
        </a>
        <div className="childScroll">
          {memes !== null && filteredMemes === null ? (
            memes.map((meme, idx) => <Item meme={meme} idx={idx} />)
          ) : memes !== null &&
            filteredMemes != null &&
            filteredMemes.length > 0 ? (
            filteredMemes.map((meme, idx) => <Item meme={meme} idx={idx} />)
          ) : loading ? (
            <span className="loader"></span>
          ) : (
            <div className="empty">
              <TbMoodEmptyFilled className="icon" />
              <h1>EMPTY</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
