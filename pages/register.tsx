import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
// import { useMutation } from "urql";
import { useRegisterMutation } from "../src/generated/graphql";
import { toError } from "../src/utils/toErrorMap";
import { useRouter } from "next/router";

// type Props = {};

const Register = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();



  const fetchRegisterdata = async (values :any, { setErrors }) => {
    console.log(values);
    const response = await register(values);
    console.log(response);
    if (response.data?.register.errors) {
      // [{field: "username", message:"something wrong"}]
      setErrors(toError(response.data.register.errors));
    } else if (response.data?.register.user) {
      router.push("/");
    }
    console.log("data", response);
    return;
  };



  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={fetchRegisterdata}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="password"
                type="password"
              />
            </Box>
            <Button mt={4} type="submit" color="teal" isLoading={isSubmitting}>
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;

// onSubmit={async (values, { setErrors }) => {
//   console.log(values);
//   const response = await register(values);
//   console.log(response);
//   if (response.data?.register.errors) {
//     // [{field: "username", message:"something wrong"}]
//     setErrors(toError(response.data.register.errors));
//   } else if (response.data?.register.user) {
//     router.push("/");
//   }
//   console.log("data", response);
//   return;
// }}