import React from 'react'
import {
    selectStyle,
    successMsg,
    errorMsgs,
    shortenNumber,
    truncateMiddle,
    roundToThreeDecimalPlaces,
  } from "../../utils/utils";
import btc from "../../assets/btc.png";
import { Link } from 'react-router-dom';

function Item({meme,idx}) {
  return (
    <Link to={`/tokens/${meme.chain}/${meme.tokenAdrr}`} className="row" key={idx}>
    <div className="token">
      <span>#{idx}</span>
      {meme.chain.toLowerCase().includes("avalanche") ? (
        <img
          src={`https://dd.dexscreener.com/ds-data/chains/avalanche.png`}
          alt=""
        />
      ) : meme.chain.toLowerCase().includes("runes") ? (
        <img src={btc} alt="" />
      ) : meme.chain.toLowerCase().includes("ordinals") ? (
        <img src={btc} alt="" />
      ) : meme.chain.toLowerCase().includes("cardano") ? (
        <img
          src={`https://cryptologos.cc/logos/cardano-ada-logo.png?v=032`}
          alt=""
        />
      ) : meme.chain.toLowerCase().includes("bnb") ? (
        <img
          src={`https://dd.dexscreener.com/ds-data/chains/opbnb.png`}
          alt=""
        />
      ) : (
        <img
          src={`https://dd.dexscreener.com/ds-data/chains/${meme.chain.toLowerCase()}.png`}
          alt=""
        />
      )}
      <h1>{meme.name}</h1>
      <h2>{meme.symbol}</h2>
    </div>
    <div className="subrow">
      <h2>{truncateMiddle(meme.tokenAdrr)}</h2>
      <h2>${roundToThreeDecimalPlaces(meme.price)}</h2>
      <h2>{shortenNumber(meme.total_supply)}</h2>
      <h2>{shortenNumber(meme.market_cap)}</h2>
    </div>
  </Link>
  )
}

export default Item