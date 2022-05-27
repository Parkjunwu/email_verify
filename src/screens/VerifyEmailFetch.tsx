import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { verifyEmailToken, verifyEmailTokenVariables } from "../__generated__/verifyEmailToken";

const VERIFY_EMAIL_TOKEN = gql`
  mutation verifyEmailToken($token: String!) {
    verifyEmailToken(token: $token) {
      ok
      error
    }
  }
`;

const VerifyEmailFetch = () => {
  const { token } = useParams<{token:string}>();

  const [ verifyResult, setVerifyResult ] = useState("loading");
  
  const [ verifyEmail, {data} ] = useMutation<verifyEmailToken,verifyEmailTokenVariables>(VERIFY_EMAIL_TOKEN, {
    onCompleted:(data)=>{
      console.log(data.verifyEmailToken)
      if(data.verifyEmailToken.ok){
        setVerifyResult("ok")
      } else {
        setVerifyResult("error")
      }
    }
  });

  useEffect(()=>{
    if(token && verifyEmail) {
      verifyEmail({
        variables:{
          token,
        },
      });
    }
  },[token,verifyEmail]);

  const displayResult = verifyResult === "loading" ? "이메일 인증 중.." :
    verifyResult === "ok" ? "이메일 인증이 완료되었습니다." :
    "이메일 인증에 실패하였습니다.";

  const error = data?.verifyEmailToken.error;
  const displayError = error === "invalid token" ? "인증 시간이 지났거나 올바르지 않은 접근입니다." : "유저 생성에 실패하였습니다."
  
  const ErrorView = () => <div>
    {displayError}<br/>
    지속적으로 같은 문제가 발생할 시 문의주시면 감사드리겠습니다.
  </div>
  return <Layout>
    <h2>{displayResult}</h2>
    {displayError && <ErrorView/>}
  </Layout>
};

export default VerifyEmailFetch;