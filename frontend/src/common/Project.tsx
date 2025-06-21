import type { JSX } from "react";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";

export interface ProjectDetails {
  name: string;
  description: string;
  date: Date;
  content: JSX.Element[];
}

export default function Project(props: ProjectDetails) {
  return (
    <>
      <Typography level="h1">{props.name}</Typography>
      <Typography level="h3">
        {props.date.toLocaleDateString("en-AU", {
          year: "numeric",
          month: "long",
        })}
      </Typography>
      <Typography level="body-md">{props.description}</Typography>
      <Grid container spacing={12} sx={{ py: 2, flexGrow: 1 }}>
        {props.content.map((content, index) => (
          <Grid key={content.key ?? index} sx={{ xs: 6, md: 8 }}>
            {content}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
