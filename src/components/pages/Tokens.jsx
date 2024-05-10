import React, { useEffect, useState } from "react";
import "../../assets/css/token.css";
import { useParams } from "react-router-dom";
import {
  successMsg,
  errorMsgs,
  shortenNumber,
  truncateMiddle,
  roundToThreeDecimalPlaces,
} from "../../utils/utils";
import { RiDownloadCloud2Fill } from "react-icons/ri";
import { TbMoodEmptyFilled } from "react-icons/tb";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function Tokens() {
  const [memeHolders, setMemeHolders] = useState(null);
  const [loading, setloading] = useState(false);
  const { id, addr } = useParams();

  const fetchtokens = async (id, addr) => {
    try {
      setloading(true);
      const res = await axios.get(
        `https://topmemebe-1.onrender.com/getErc20TokenHolders/${id}/${addr}`
      );
      setMemeHolders(res.data);
      // console.log(res.data);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  const copyCA = async (e) => {
    const ca = e.target.getAttribute("data-ca");
    if (ca !== null) {
      await navigator.clipboard.writeText(ca);
      successMsg("Copied address successfully");
    }
  };

  function downloadCSV() {
    // Convert the array of strings into a CSV string
    // Extract 'amount' and 'wallet_address' fields from each object
    const csvContent = memeHolders
      .map((obj) => `${obj.wallet_address}`)
      .join("\n");

    // Create a Blob object from the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a temporary link element
    const link = document.createElement("a");

    // Set the link's attributes
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", `${addr + id}`);

    // Append the link to the document body and trigger the download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
  }

  useEffect(() => {
    if (id && addr) {
      fetchtokens(id, addr);
    }
  }, [useParams]);
  return (
    <div className="token">
      <ToastContainer />
      <h1>TOP 100 TOKEN HOLDERS</h1>
      <h2>
        <span>{truncateMiddle(addr)}</span>
        <span>{id}</span>
      </h2>
      <div className="child">
        <div className="header">
          <div className="txt">
            <h2>Adrress</h2>
            <h2>Amount</h2>
          </div>
          <RiDownloadCloud2Fill className="icon" onClick={downloadCSV} />
        </div>
        <div className="childScroll">
          {memeHolders && memeHolders.length > 0 && !loading ? (
            memeHolders.map((meme, idx) => (
              <div className="row" key={idx}>
                <h2 onClick={copyCA} data-ca={meme.wallet_address}>
                  {truncateMiddle(meme.wallet_address)}
                </h2>
                <h2>{shortenNumber(meme.amount)}</h2>
              </div>
            ))
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

export default Tokens;
