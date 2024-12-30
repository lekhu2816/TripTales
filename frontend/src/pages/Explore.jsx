import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import axios from "axios";
const list = [
  "Mountains",
  "Valley",
  "Desert",
  "Trekking",
  "Camping",
  "Monuments",
  "Waterfalls",
  "Valleys",
  "Zoos",
  "Festivals",
];
const Explore = () => {
  const { setShowDropdown, explorePost, setExplorePost, SERVER_URL } =
    useContext(AppContext);
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);

  //-----------------------------fetching posts---------------------//

  const fetchExlorePost = async () => {
    setLoading(true);
    const url = `${SERVER_URL}/api/post/explore-post/?tag="${tag}"&page=0&limit=10`;
    try {
      const response = await axios.get(url, { withCredentials: true });
      if (response.status == 200) {
        setExplorePost(response.data.posts);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (tag) {
      fetchExlorePost();
    }
  }, [tag]);

  useEffect(() => {
    if (explorePost.length == 0) {
      fetchExlorePost();
    }
  }, []);

  useEffect(() => {
    setShowDropdown(false);
  }, []);
  return (
    <div onClick={() => setShowDropdown(false)}>
      <div className="flex gap-4 justify-between  overflow-x-scroll no-scrollbar">
        {list.map((item, index) => {
          return (
            <div
              onClick={() => setTag(item)}
              className={`bg-gray-200 py-1 px-2 rounded-md  text-sm cursor-pointer ${
                item == tag ? "bg-secondary text-white" : ""
              }`}
            >
              {item}
            </div>
          );
        })}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[89vh]">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-3 mt-4 ">
          {explorePost.map((post, index) => {
            return (
              <img
                key={index}
                className="w-[24%] tablet:w-[48%]"
                src={post.image}
                alt=""
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Explore;
