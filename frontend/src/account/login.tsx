import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";

export default function Login() {
  return (
    <Sheet
      sx={{
        width: 300,
        mx: "auto", // margin left & right
        my: 4, // margin top & bottom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
    >
      <Typography level="h4" component="h1">
        Welcome!
      </Typography>
      <Typography level="body-sm">Sign in to continue.</Typography>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          // html input attribute
          name="email"
          type="email"
          placeholder="johndoe@email.com"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input name="password" type="password" placeholder="password" />
      </FormControl>
      <Button sx={{ mt: 1 /* margin top */ }}>Log in</Button>
      <Typography
        endDecorator={<Link href="/sign-up">Sign up</Link>}
        fontSize="sm"
        sx={{ alignSelf: "center" }}
      >
        Don&apos;t have an account?
      </Typography>
    </Sheet>
  );
}
