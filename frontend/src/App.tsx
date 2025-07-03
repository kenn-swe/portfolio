import { useState, useEffect } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import { Box, Button } from "@mui/joy";
import type { ProjectDetails } from "./common/Project";
import Project from "./common/Project";
import PreviewCard from "./common/components/PreviewCard";
import Login from "./account/login";
import type { SxProps } from "@mui/joy/styles/types";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}

// Data
const test: ProjectDetails = {
  name: "Lorem Ipsum",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod diam ut aliquam facilisis. Integer vel mauris a elit luctus mattis. Duis ex mauris, pellentesque ac urna non, feugiat gravida erat. Duis finibus eget lacus sit amet congue. Vivamus varius, metus at finibus egestas, erat massa convallis diam, vel maximus justo odio eu augue. Nullam commodo, sem faucibus accumsan efficitur, tortor nibh efficitur nibh, vitae sodales diam leo id turpis. Vestibulum malesuada rutrum enim et consectetur. Nullam et lacinia sapien. In lacus nisl, euismod placerat mattis at, sodales in justo. Praesent fringilla convallis rutrum. Etiam imperdiet ullamcorper neque, in sollicitudin mi pretium sed. Proin ut eros malesuada, viverra erat eget, faucibus metus. In hac habitasse platea dictumst. Donec sit amet nulla ac massa ultricies faucibus et at purus. Aenean at eros quis nunc fermentum consectetur.",
  dateStart: new Date(2025, 2), // month is 0-indexed
  dateEnd: new Date(),
  content: [
    <PreviewCard key="card-1" />,
    <PreviewCard key="card-2" />,
    <PreviewCard key="card-3" />,
  ],
};

const test1: ProjectDetails = {
  name: "Lorem Ipsum",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod diam ut aliquam facilisis. Integer vel mauris a elit luctus mattis. Duis ex mauris, pellentesque ac urna non, feugiat gravida erat. Duis finibus eget lacus sit amet congue. Vivamus varius, metus at finibus egestas, erat massa convallis diam, vel maximus justo odio eu augue. Nullam commodo, sem faucibus accumsan efficitur, tortor nibh efficitur nibh, vitae sodales diam leo id turpis. Vestibulum malesuada rutrum enim et consectetur. Nullam et lacinia sapien. In lacus nisl, euismod placerat mattis at, sodales in justo. Praesent fringilla convallis rutrum. Etiam imperdiet ullamcorper neque, in sollicitudin mi pretium sed. Proin ut eros malesuada, viverra erat eget, faucibus metus. In hac habitasse platea dictumst. Donec sit amet nulla ac massa ultricies faucibus et at purus. Aenean at eros quis nunc fermentum consectetur.",
  dateStart: new Date(2025, 1),
  dateEnd: null,
  content: [
    <PreviewCard key="card-1" />,
    <PreviewCard key="card-2" />,
    <PreviewCard key="card-3" />,
  ],
};

const data: ProjectDetails[] = [test, test1];

const contentStyles: SxProps = {
  maxWidth: "1280px",
  p: "2rem",
  mx: "auto",
};

function App() {
  return (
    <>
      <CssVarsProvider>
        <Box sx={contentStyles}>
          {data.map((project, index) => (
            <Project key={index} {...project} />
          ))}
          <Login />
          <ModeToggle />
        </Box>
      </CssVarsProvider>
    </>
  );
}

export default App;
