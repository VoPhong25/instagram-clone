import { useEffect, useState } from "react";
import styled from "styled-components";
import Progressbar from "./Progressbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StoryViewerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`;

const StoryImage = styled.img`
  max-height: 90vh;
  object-fit: contain;
`;

const StoryViewer = ({ stories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const user = useSelector(store=>store.user)

  useEffect(() => {
    if (!stories || stories.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        // 👉 XEM HẾT STORY → VỀ TRANG CHỦ
        if (prev === stories.length - 1) {
          clearInterval(interval);
          navigate(`/${user.reqUser?.username}`);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [stories, navigate]);

  return (
    <div className="relative w-full">
      <StoryViewerContainer>
        {stories?.length > 0 && (
          <StoryImage src={stories[currentIndex]?.image} />
        )}

        <div className="absolute top-0 flex w-full">
          {stories?.map((_, index) => (
            <Progressbar
              key={index}
              duration={2000}
              index={index}
              activeIndex={currentIndex}
            />
          ))}
        </div>
      </StoryViewerContainer>
    </div>
  );
};

export default StoryViewer;
