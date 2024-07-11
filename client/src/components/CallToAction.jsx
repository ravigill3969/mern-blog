import { Button } from "flowbite-react";

function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center ">
      <div className="flex-1 justify-center  ">
        <h2 className="text-2xl text-gray-500 my-2">Want to learn more about js?</h2>
      </div>
      <Button gradientDuoTone={'purpleToPink'} className="">
        <a href="#" target="_blank" rel="noopener noreferrer">Blank for now</a>
      </Button>
      <div className="p-7 flex-1">
        <img src="https://imgs.search.brave.com/bqQQGzZZdl1a5SF4ahd6syPKTFDl4UNuhZKFPXGU8Tw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/MTg5MzI5NDU2NDct/N2ExYzk2OWY4YmUy/P2ZtPWpwZyZ3PTMw/MDAmYXV0bz1mb3Jt/YXQmZml0PWNyb3Am/cT02MCZpeGxpYj1y/Yi00LjAuMyZpeGlk/PU0zd3hNakEzZkRC/OE1IeHpaV0Z5WTJo/OE9IeDhhbUYyWVhO/amNtbHdkSHhsYm53/d2ZId3dmSHg4TUE9/PQ.jpeg" alt="random" />
      </div>
    </div>
  );
}

export default CallToAction;
