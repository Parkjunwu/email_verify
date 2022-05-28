import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { verifyEmailToken, verifyEmailTokenVariables } from "../__generated__/verifyEmailToken";

const VERIFY_EMAIL_TOKEN = gql`
  mutation verifyEmailToken($token: String!, $email:String!) {
    verifyEmailToken(token: $token, email:$email) {
      ok
      error
    }
  }
`;

const VerifyEmailFetch = () => {
  const { token, email } = useParams<{token:string,email:string}>();
  
  const [ verifyResult, setVerifyResult ] = useState("loading");
  
  const [ verifyEmail, { data, error:mutationError } ] = useMutation<verifyEmailToken,verifyEmailTokenVariables>(VERIFY_EMAIL_TOKEN, {
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
    if(token && email && verifyEmail) {
      verifyEmail({
        variables:{
          token,
          email,
        },
      });
    }
  },[token,email,verifyEmail]);
  
  useEffect(()=>{
    if(mutationError){
      setVerifyResult("mutationError");
    }
  },[mutationError]);


  const displayResult = verifyResult === "loading" ? "이메일 인증 중.." :
    verifyResult === "ok" ? "이메일 인증이 완료되었습니다." :
    "이메일 인증에 실패하였습니다.";

  const ok = data?.verifyEmailToken.ok
  
  const OkView = () => <div>
    해당 이메일로 로그인해 주시면 감사드리겠습니다.<br/>
    저희 서비스를 이용해 주셔서 진심으로 감사드립니다.
  </div>;

  const error = data?.verifyEmailToken.error;
  const displayError = error === "invalid token" ? "인증 시간이 지났거나 올바르지 않은 접근입니다." : "유저 생성에 실패하였습니다."

  const ErrorView = () => <div>
    {displayError}<br/>
    지속적으로 같은 문제가 발생할 시 문의주시면 감사드리겠습니다.
  </div>;

  return <Layout>
    <h2>{displayResult}</h2>
    {ok && <OkView/>}
    {error && <ErrorView/>}
  </Layout>
};

export default VerifyEmailFetch;