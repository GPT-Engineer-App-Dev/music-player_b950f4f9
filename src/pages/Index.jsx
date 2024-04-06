import React, { useState } from "react";
import { Box, Button, Container, IconButton, Image, Progress, Text, VStack, HStack, useToast } from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const songs = [
  {
    title: "Song One",
    artist: "Artist A",
    src: "https://placehold.co/600x400",
    length: 210,
  },
  {
    title: "Song Two",
    artist: "Artist B",
    src: "https://placehold.co/600x400",
    length: 180,
  },
  {
    title: "Song Three",
    artist: "Artist C",
    src: "https://placehold.co/600x400",
    length: 240,
  },
];

const Index = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const toast = useToast();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      toast({
        title: "Paused",
        description: `Paused ${songs[currentSongIndex].title}`,
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Playing",
        description: `Now Playing ${songs[currentSongIndex].title}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setProgress(0);
  };

  const simulateProgress = () => {
    if (isPlaying) {
      setProgress((prevProgress) => (prevProgress < songs[currentSongIndex].length ? prevProgress + 1 : 0));
    }
  };

  // Simulate song progress
  React.useEffect(() => {
    const interval = setInterval(simulateProgress, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentSongIndex]);

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={4} py={10}>
        <Image boxSize="200px" objectFit="cover" src={songs[currentSongIndex].src} alt="Album cover" />
        <Text fontSize="2xl" fontWeight="bold">
          {songs[currentSongIndex].title}
        </Text>
        <Text fontSize="lg">{songs[currentSongIndex].artist}</Text>
        <Box width="100%">
          <Progress value={(progress / songs[currentSongIndex].length) * 100} />
        </Box>
        <HStack spacing={4}>
          <IconButton icon={<FaBackward />} onClick={handlePrev} aria-label="Previous song" />
          <IconButton icon={isPlaying ? <FaPause /> : <FaPlay />} onClick={handlePlayPause} aria-label={isPlaying ? "Pause" : "Play"} />
          <IconButton icon={<FaForward />} onClick={handleNext} aria-label="Next song" />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
