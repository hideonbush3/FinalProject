import React, {useEffect, useState} from 'react';
import "./Modify.css"
import {Col, Row} from "react-bootstrap";
import axios from "axios";

export default function Modify() {
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('none');
    const [phone, setPhone] = useState('');
    const [userType, setUserType] = useState('user');
    const [isAgree, setIsAgree] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/readModify`)
            .then(response => {
               let userInfo = response.data[0];
               let name = userInfo[0].replaceAll("\"","");
               let birth = userInfo[1];
               let gender = userInfo[2];
               let phone = userInfo[3];
               let type = userInfo[4];
               let agree = userInfo[5];
               setName(name);
               setBirth(birth);
               setGender(gender);
               setPhone(phone);
               setUserType(type);
               if(agree === "agree") setIsAgree(true);

                console.log(agree);

            })
            .catch(error => console.log(error))
    }, []);

    const handleBirth = (e) => {
        setBirth(e.target.value);
    };

    const handleGender = (e) => {
        setGender(e.target.value);
    };
    const handlePhone = (e) => {
        setPhone(e.target.value);
    };
    const handleUserType = (e) => {
        setUserType(e.target.value);
        if(userType === "user") setIsAgree(false);
    };
    const handleAgree = (e) => {
        setIsAgree(e.target.checked);
    };
    //여기서 검증과 post 요청을 하도록 한다.
    const handleSubmit = (e) => {
        e.preventDefault();
        // 생년월일이 8자리 숫자인지 검증
        const birthRegex = /^\d{8}$/; // 정규표현식
        const phoneRegex = /^\d{10,11}$/; // 정규표현식
        if (!birthRegex.test(birth)) {
            alert("생년월일을 8자리 숫자로 작성해주세요")
        } else if (!phoneRegex.test(phone)) {
            alert("핸드폰 번호는 10자리, 11자리 숫자여야 합니다.");
        } else if(userType === "tutor" && isAgree === false) {
            alert("이용약관에 동의해주세요")
        } else {
            let agree = 'none';
            if(isAgree === true) agree = 'agree';

            axios.post('http://localhost:8080/api/modify', {
                birth: birth,
                gender: gender,
                phone: phone,
                type:userType,
                agree:agree
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

            alert("submit 성공!")
        }

    };
    return(
        <div className="modifyMain mt-5">
            <Row>
                <Col className={"offset-xl-4 col-xl-4 modifyContainer"}>
                    <h3 className={"text-start ps-4 registerHeader"} style={{marginBottom:"32px"}}>개인 정보 수정</h3>
                    <div id="modifyForm" className="ps-3 border-top border-2 border-dark">
                        <Row className={"mb-4 mt-3"}>
                            <Col className={"col-3 align-self-center"}>
                                <label htmlFor="name"><p style={{margin:"0"}}>이름</p></label>
                            </Col>
                            <Col className={"col-6"}>
                                <input type="text" id="name" readOnly={true} style={{width:"100%",height:"40px"}} value={name} />
                            </Col>
                        </Row>

                        <Row className={"mb-4"}>
                            <Col className={"col-3 align-self-center"}>
                                <p style={{margin:"0"}}>생년월일</p>
                            </Col>
                            <Col className={"col-6"}>
                                <input type="text" style={{width:"100%",height:"40px"}} placeholder='ex)20130527' onChange={handleBirth} value={birth}  />
                            </Col>
                        </Row>
                        <Row className={"mb-4"}>
                            <Col className={"col-3 align-self-center"}>
                                <p style={{margin:"0"}}>성별</p>
                            </Col>
                            <Col className={"col-6"}>
                                <div className="registerGenderInputContainer d-flex justify-content-between px-2">
                                    <label><input type="radio" name='gender' value="male" checked={gender === 'male'} onChange={handleGender}/><span>&nbsp;&nbsp; 남</span></label>
                                    <label><input type="radio" name='gender' value="female" checked={gender === 'female'} onChange={handleGender} /><span>&nbsp;&nbsp; 여</span></label>
                                    <label><input type="radio" name='gender' value="none" checked={gender === 'none'} onChange={handleGender} /><span>&nbsp;&nbsp; 선택안함</span></label>
                                </div>
                            </Col>
                        </Row>
                        <Row className={"mb-4"}>
                            <Col className={"col-3 align-self-center"}>
                                <p style={{margin:"0"}}>휴대폰 번호</p>
                            </Col>
                            <Col className={"col-6"}>
                                <input type="text" style={{width:"100%",height:"40px"}} placeholder='ex)01012341234' onChange={handlePhone} value={phone}/>
                            </Col>
                        </Row>
                        <Row className={"mb-5"}>
                            <Col className={"col-3 align-self-center"}>
                                <label htmlFor="userType"><p style={{margin:"0"}}>구분</p></label>
                            </Col>
                            <Col className={"col-6"}>
                                <div className="registerTypeInputContainer d-flex justify-content-between px-2">
                                    <label><input type="radio" id="userType" name='userType' value="user" checked={userType === 'user'} onChange={handleUserType} /><span>&nbsp;&nbsp; 유저</span></label>
                                    <label><input type="radio" name='userType' value="tutor" checked={userType === 'tutor'} onChange={handleUserType} /><span>&nbsp;&nbsp; 유저 + 강사</span></label>
                                </div>
                            </Col>
                        </Row>

                        <Row className={"mb-4"} style={(userType === 'tutor') ? {display:"flex"} : {display:"none"} }>
                            <Col>
                                <h4 className="text-center">약관 동의</h4>
                                <hr/>
                                <textarea rows="10" className="form-control" readOnly={true}>
제 1조(목적)

본 이용약관은 주식회사 기술토끼(이하 “회사”라 합니다)가 제공하는 스킬라빗(이하 “서비스”라 합니다)와 관련하여, 회사와 “회원”간에 서비스의 이용조건 및 절차, 회사와 회원간의 권리, 의무 및 기타 필요한 사항을 규정함을 목적으로 합니다


본 약관은 PC통신, 스마트폰(안드로이드폰, 아이폰) 앱 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 본 약관은 준용됩니다.
제 2조(용어의 정의)

“사이트”란 “판매자”가 재화 또는 서비스 상품(원데이클래스, 정규 수강권, 이용권, 1회체험권) (이하 “재화 등”)을 “이용자”에게 판매하기 위하여, 회사가 컴퓨터 등 정보통신 설비를 이용하여 재화 등을 거래할 수 있도록 설정하여 제공하는 가상의 영업장을 말합니다.
“판매자”란 회사가 제공하는 서비스를 이용해 재화 등에 관한 정보를 게재하고 이용자에게 판매하는 주체를 말합니다.
“이용자”이라 함은 회사가 제공하는 서비스를 이용해 판매자의 재화 등에 관한 정보를 확인하고, 구매하는 주체를 말합니다.
“회원”이라 함은 “기술토끼”(이하 ”회사”)에 개인정보를 제공하여 회원등록을 한 자 로서, 판매자와 이용자가 모두 포함됩니다. 또한 회사의 정보를 지속적으로 제공받으며, 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 의미합니다.
“아이디(ID)”라 함은 회원의 동일성 확인과 권익 및 비밀보호를 위하여 회원 스스로가 설정하여 사이트에 등록한 문자와 숫자 등의 조합을 말합니다.
“비밀번호(Password)”라 함은 회원의 동일성 확인과 회원의 권익 및 비밀보호를 위하여 회원 스스로가 설정하여 사이트에 등록한 영문과 숫자 등의 조합을 말합니다.


제 3조(약관의 명시와 개정)

“회사”는 이 약관의 내용과 상호, 사업자 소재지 주소, 사업자등록번호, 통신판매업 신고번호, 연락처(전화, 전자우편 주소 등) 등을 “회원”가 쉽게 알 수 있도록 “사이트”의 초기 “서비스” 화면에 게시합니다. 다만, 약관의 내용은 “회원”이 연결화면을 통하여 볼 수 있습니다.
“회사”는 『전자상거래 등에서의 소비자보호에 관한 법률』, 『약관의 규제 등에 관한 법률』, 『전자문서 및 전자거래기본법』, 『전자서명법』, 『정보통신망 이용촉진 등에 관한 법률』, 『소비자기본법』 등 관련 법령을 위배 하지 않는 범위에서 이 약관을 개정할 수 있습니다.
“회사”는 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 “사이트”의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, “회원”에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 “회사”는 개정 전과 개정 후 내용을 “회원”이 알기 쉽도록 표시합니다.
“회원”은 변경된 약관에 동의하지 않을 권리가 있으며, 변경된 약관에 동의하지 않을 경우에는 서비스 이용을 중단하고 탈퇴를 요청할 수 있습니다. 다만, “회원”이 전 항에 따라 공지된 적용일자 이후에 “회사”의 서비스를 계속 이용하는 경우에는 개정된 약관에 동의하는 것으로 봅니다.
이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 『전자상거래 등에 서의 소비자보호에 관한 법률』, 『약관의 규제 등에 관한 법률』, 공정거래위원회가 정하는 『전자상거래 등에서의 소비자 보호지침 및 관계법령』 또는 상관례에 따릅니다.


제 4조(개별 서비스에 대한 약관/이용조건)

“회사”는 제공하는 “서비스”의 구체적 내용에 따라 개별 “서비스”에 대한 약관 및 이용조건을 각 개별 “서비스”마다 별도로 정하여 “회원”의 동의를 구할 수 있습니다. 이 경우 개별 “서비스”에 대한 이용약관 등이 본 약관에 우선합니다.


제 5조(서비스의 제공 및 변경)

“회사”는 다음과 같은 서비스를 제공합니다.1) “재화 등”에 대한 광고 서비스2) “재화 등”에 대한 예약 신청 중개 등 통신판매중개서비스 3) 위치기반 서비스 4) 기타 “회사”가 정하는 서비스
“회사”는 서비스 제공과 관련한 회사 정책의 변경 등 기타 상당한 이유가 있는 경우 등 운영상, 기술상의 필요에 따라 제공하고 있는 “서비스”의 전부 또는 일부를 변경 또는 중단할 수 있습니다.
“서비스”의 내용, 이용방법, 이용시간에 대하여 변경 또는 “서비스” 중단이 있는 경우에는 변경 또는 중단될 “서비스”의 내용 및 사유와 일자 등은 그 변경 또는 중단 전에 회사 “사이트” 또는 “서비스” 내 “공지사항” 화면 등 “회원”이 충분히 인지할 수 있는 방법으로 사전에 공지합니다. 단, 불가피하게 긴급한 조치를 필요로 하는 경우 사후에 통지할 수 있습니다.


제 6조(이용계약의 성립)

1. 이용계약은 “회원”이 되고자 하는 자(이하 “가입신청자”)가 약관의 내용에 동의를 하고, “회사”가 정한 가입 양식에 따라 회원정보(아이디, 비밀번호, 이름, 연락처, 전자우편주소 등)를 기입하여 회원가입신청을 하고 “회사”가 이러한 신청에 대하여 승인함으로써 체결됩니다.
2. “회사”는 다음 각 호에 해당하는 신청에 대하여는 승인을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.
1)“가입 신청자”가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우. 다만, 회원자격 상실 후 1개월이 경과한 자로서 “회사”의 “회원” 재가입 승낙을 얻은 경우에는 예외로 함
2)타인의 명의를 이용한 경우
3)“회사”가 실명확인절차를 실시할 경우에 이용자의 실명가입신청이 사실 아님이 확인된 경우 4)“회사”에 의하여 이용계약이 해지된 날로부터 1개월 이내에 재이용 신청을 하는 경우
5)등록내용에 허위의 정보를 기재하거나, 기재누락, 오기가 있는 경우
6)이미 가입된 “회원”과 전화번호나 전자우편주소가 동일한 경우
7)정한 용도 이외의 영리를 추구할 목적으로 본 “서비스”를 이용하고자 하는 경우
8)기타 이 약관에 위배되거나 위법 또는 부당한 이용신청임이 확인된 경우 및 회사가 합리적인 판단에 의하여 필요하다고 인정하는 경우
9)관계법령에 위배되거나 사회의 안녕질서 혹은 미풍양속을 저해할 수 있는 목적으로 신청한 경우 10)“회원”의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하여 신청하는 경우
3. 제1항에 따른 신청에 있어 “회사”는 “회원”의 종류에 따라 전문기관을 통한 실명확인 및 본인인증을 요청할 수 있습니다.
4. “회사”는 서비스관련설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.
5. “회원”은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 “회사”에 대하여 회원정보 수정 등의 방법으로 그 변경사항을 알려야 합니다.


제 7조(계약의 종료)

1. “회원”의 해지
1) “회원”은 언제든지 “회사”에게 해지의사를 통지함으로써 이용계약을 해지할 수 있습니다.
2) “회사”는 전항에 따른 “회원”의 해지요청에 대해 특별한 사정이 없는 한 이를 즉시 처리합니다.
3) “회원”이 계약을 해지하는 경우 “회원”이 작성한 게시물은 삭제되지 않습니다.
2. “회사”의 해지
1) “회사”는 다음과 같은 사유가 있는 경우, 이용계약을 해지할 수 있습니다. 이 경우 “회사”는 “회원”에게 전자우편, 전화, 팩스 기타의 방법을 통하여 해지사유를 밝혀 해지의사를 통지합니다. 다만, “회사”는 해당 “회원”에게 해지사유에 대한 의견진술의 기회를 부여 할 수 있습니다.
가. 제6조 제2항에서 정하고 있는 이용계약의 승낙거부사유가 있음이 확인된 경우
나. “회원”이 “회사”나 다른 회원 기타 타인의 권리나 명예, 신용 기타 정당한 이익을 침해하는 행위를 한 경우
다. 기타 “회원”이 이 약관 및 “회사”의 정책에 위배되는 행위를 하거나 이 약관에서 정한 해지사유가 발생한 경우
라. 1년 이상 서비스를 이용한 이력이 없는 경우
2) 이용계약은 “회사”가 해지의사를 “회원”에게 통지함으로써 종료됩니다. 이 경우 “회사”가 해지의사를 “회원”이 등록한 전자우편주소로 발송하거나 “회사” 게시판에 게시함으로써 통지에 갈음합니다.

제 8조(서비스 이용시간)

"서비스"의 이용은 "회사"의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일24시간을 원칙으로 합니다. 다만, 정기 점검 등의 필요로 "회사"가 정한 날이나 시간은 제외됩니다.


제 9조(회원의 아이디(ID) 및 비밀번호(Password)에 대한 의무)

1. "아이디(ID)"와 "비밀번호(Password)"에 관한 관리책임은 "회원"에게 있으며, 이를 소홀히 하여 발생한 모든 민형사상의 책임은 "회원" 자신에게 있습니다.
2. "회원"은 자신의"아이디(ID)"및 "비밀번호(Password)"를 제3자가 이용하게 해서는 안됩니다.
3. "회원"이 자신의"아이디(ID)"및 "비밀번호(Password)"를 도난 당하거나 제 3자가 사용하고 있음을 인지한 경우에는 즉시 "회사"에 통보하고 "회사"의 조치가 있는 경우에는 그에 따라야 합니다.
4. "회원"이 전 항에 따른 통지를 하지 않거나 "회사"의 조치에 응하지 아니하여 발생하는 모든 불이익에 대한 책임은 "회원"에게 있습니다.


제 10조(회원의 의무)

1. "회원"은 관계법령이 약관의 규정, 이용안내 등 회사가 통지하는 사항을 준수하여야 하며, 기타 "회사" 업무에 방해되는 행위를 하여서는 안됩니다.
2. "회원"은 "서비스" 이용과 관련하여 다음 각 호의 행위를 하여서는 안됩니다.
1) "서비스" 신청 또는 변경 시 허위내용의 등록
2) "회사"에 게시된 정보의 허가 받지 않은 변경
3) "회사"가 정한 정보 이외의 정보(컴퓨터 프로그램 등)의 송신 또는 게시
4) "회사" 기타 제3자의 저작권 등 지적 재산권에 대한 침해
5) "회사" 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
6) 외설 또는 폭력적인 메시지, 화상, 음성 기타 공공질서 미풍양속에 반하는 정보를 "회사"에 공개 또는 게시하는 행위
7) 정당한 사유 없이 당사의 영업을 방해하는 내용을 기재하는 행위
8) 리버스엔지니어링, 디컴파일, 디스어셈블 및 기타 일체의 가공행위를 통하여 서비스를 복제, 분해 또는 모방 기타 변형하는 행위
9) 자동 접속 프로그램 등을 사용하는 등 정상적인 용법과 다른 방법으로 서비스를 이용하여 회사의 서버에 부하를 일으켜 회사의 정상적인 서비스를 방해하는 행위
10) 기타 관계법령이나 회사에서 정한 규정에 위배되는 행위
3. “회원”은 회사에서 공식적으로 인정한 경우를 제외하고는 서비스를 이용하여 상품을 판매하는 영업 활동을 할 수 없으며, 특히 해킹, 광고를 통한 수익, 음란사이트를 통한 상업행위, 상용소프트웨어 불법배포 등을 할 수 없습니다. 이를 위반하여 발생한 영업 활동의 결과 및 손실, 관계기관에 의한 구속 등 법적 조치 등에 관해서는 “회사”가 책임을 지지 않으며, “회원”은 이와 같은 행위와 관련하여 “회사”에 대하여 손해배상 의무를 집니다.
4. “회원”은 등록정보에 변경사항이 발생할 경우 즉시 갱신하여야 합니다. “회원”이 제공한 등록정보 및 갱신한 등록정보가 부정확할 경우, 기타 “회원”이 본 조 제 2항에 명시된 행위를 한 경우에 “회사”는 본 서비스 약관 제34조에 의해 “회원”의 서비스 이용을 제한 또는 중지 할 수 있습니다.


제 11조(회원의 게시물)

“회원”이 작성한 게시물에 대한 저작권 및 모든 책임은 이를 게시한 “회원”에게 있습니다. 단, “회사”는 “회원”이 게시하거나 등록하는 게시물의 내용이 다음 각 호에 해당한다고 판단되는 경우 해당 게시물을 사전통지 없이 삭제 또는 임시조치(블라인드)할 수 있습니다.
1) 다른 "회원" 또는 제3자를 비방하거나 명예를 손상시키는 내용인 경우
2) 공공질서 및 미풍양속에 위반되는 내용일 경우
3) 범죄적 행위에 결부된다고 인정되는 경우
4) "회사"의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 내용인 경우
5) "회원"이 사이트와 게시판에 음란물을 게재하거나 음란사이트를 링크하는 경우
6) "회사"로부터 사전 승인 받지 아니한 상업광고, 판촉 내용을 게시하는 경우
7) 해당 상품과 관련 없는 내용인 경우
8) 정당한 사유 없이 “회사” 또는 “판매자”의 영업을 방해하는 내용을 기재하는 경우
9) 자신의 “판매자”를 홍보할 목적으로 허위 또는 과장된 게시글을 게재하는 경우
10) 의미 없는 문자 및 부호에 해당하는 경우
11) 제3자 등으로부터 권리침해신고가 접수된 경우
12) 관계법령에 위반된다고 판단되는 경우


제 12조(게시물의 저작권)

1. “회원”이 “서비스” 내에 게시한(회원간 전달 포함) 내용물의 저작권은 “회원”이 소유하며 “회사”는 이를 게시할 수 있는 권리를 갖습니다.
2. “회사”는 “회원”이 “서비스” 내에 게시한 게시물이 타인의 저작권, 프로그램 저작권 등을 침해하더라도 이에 대한 민, 형사상의 책임을 부담하지 않습니다. 만일 “회원”이 타인의 저작권, 프로그램저작권 등을 침해하였음을 이유로 “회사”가 타인으로부터 손해배상청구 등 이의 제기를 받은 경우 “회원”은 “회사”의 면책을 위하여 노력하여야 하며, “회사”가 면책되지 못한 경우 “회원”은 그로 인해 “회사”에 발생한 모든 손해를 부담하여야 합니다.
3. “회사”가 작성한 저작물, 기타 콘텐츠에 대한 저작권 기타 권리는 “회사”에 귀속합니다.
4. “회원”은 “서비스”를 이용하여 얻은 정보를 가공, 판매하는 행위 등 “서비스”에 게재된 자료를 영리목적으로 이용하거나 제3자에게 이용하게 할 수 없으며, 게시물에 대한 저작권 침해는 관계 법령의 적용을 받습니다.


제 13조(이용제한)

1. “회사”는 “회원”이 이 약관의 의무를 위반하거나 “서비스”의 정상적인 운영을 방해한 경우, 경고, 일시정지, 영구이용정지 등의 서비스 이용제한 조치를 취할 수 있습니다.
2. “회사”는 "주민등록법"을 위반한 명의도용 및 결제도용, 전화번호 도용, "저작권법" 및 "컴퓨터프로그램보호법"을 위반한 불법프로그램의 제공 및 운영방해, "정보통신망법"을 위반한 불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을 위반한 경우에는 즉시 영구이용정지를 할 수 있습니다.
3. “회사”는 “회원”이 계속해서 1년 이상 로그인하지 않는 경우, 회원정보의 보호 및 운영의 효율성을 위해 이용을 제한할 수 있습니다.
4. 본 조의 이용제한 범위 내에서 제한의 조건 및 세부내용은 “회사”의 이용제한정책에서 정하는 바에 의합니다.
5. 본 조에 따라 “서비스” 이용을 제한하거나 계약을 해지하는 경우에는 “회사”는 제14조[회원에 대한 통지]에 따라 통지합니다.
6. “회원”은 본 조에 따른 이용제한 등에 대해 “회사”가 정한 절차에 따라 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 회사가 인정하는 경우 “회사”는 즉시 서비스의 이용을 재개합니다.
7. 본 조에 따라 이용제한이 되는 경우 서비스 이용을 통해 획득한 혜택 등도 모두 이용중단, 또는 소멸되며, “회사”는 이에 대해 별도로 보상하지 않습니다.


제 14조(회원에 대한 통지)

1. “회사”가 “회원”에 대한 통지를 하는 경우, “회원”이 가입신청 시 “회사”에 제출한 전자우편 주소나 휴대전화번호 등으로 할 수 있습니다.
2. “회사”는 불특정다수 “회원”에 대한 통지의 경우, 1주일 이상 사이트에 게시 함으로서 개별 통지에 갈음할 수 있습니다.


제 15조(사용 가능한 결제수단)

1, "회원"은 "회사"에서 구매한 "재화 등"에 대한 대금지급을 다음 각 호의 하나로 할 수 있습니다.
1) 신용카드 등
2) 선불카드
3) 스킬라빗 적립금
4) 할인쿠폰
5) 휴대폰 결제
6) 실시간 계좌이체
7) 가상 계좌(단 "회사" 정책에 따라 이용 범위가 제한될 수 있습니다.)
8) 기타 "회사"가 추가 지정하는 결제 수단

2. "회사"는 "회원"의 대금 지급에 법적, 기술적 문제가 발생하거나 "회사"가 예견하지 못한 장애(은행 통신망 장애 등)가 발생하는 경우 "회사"의 정책에 따라 "회원"에게 결제 수단의 변경을 요청하거나 잠정 결제보류 내지 거부할 수 있습니다.


제 16조(포인트)

1. 포인트는 “서비스”를 통해 “재화 등”을 구매하는 경우 대금 결제 수단으로 사용할 수 있는 현금 등가 등의 결제수단을 의미합니다.
2. 포인트는 “회원”의 구매활동, 이벤트 참여 등에 따라 “회사”가 적립, 부여하는 무료 포인트와 “회원”이 유료로 구매하는 유료 포인트로 구분됩니다.
3. 무료 포인트의 유효기간은 적립일로부터 1년이며, 유료 포인트는 충전일로부터 5년이 경과하는 날까지 이용하지 않을 경우 상법상 소멸시효에 따라 소멸됩니다. 단, “회사”는 무료 포인트의 유효기간을 변경할 수 있으며 이 경우 발급 시점에 “회원”에게 고지합니다.
4. “회사”가 무상으로 적립 또는 부여하는 무료 포인트는 현금 환급 신청이 불가합니다.
5. “회사”는 “회원”이 유료 포인트에 대한 환급을 요구할 경우, 환급수수료를 공제하고 환급할 수 있으며, 환급조건 및 환급수수료에 대한 구체적인 내용은 서비스 페이지를 통해 안내합니다.
6. “회원” 탈퇴 시 미 사용한 무료 포인트는 소멸되며, “회사”는 소멸되는 무료 포인트에 대해서 별도의 보상을 하지 않습니다.
7. “회사”는 “회원”이 포인트를 적립, 구매, 사용하는 경우 휴대폰인증, I-PIN 등 “회사”가 정한 인증절차를 거치도록 할 수 있습니다.
8. “회사”는 포인트 적립기준, 사용조건 및 제한 등에 관한 사항을 서비스 화면에 별도로 게시하거나 통지합니다.


제 17조(쿠폰)

1. 쿠폰은 “회사”의 이벤트 프로모션 참여, “판매자”의 발급, “회사”의 정책에 따른 “이용자” 등급별 부여 등을 통하여 “이용자”에게 지급되며, “쿠폰”별 유효기간, 할인금액 및 사용방법 등은 개별 안내사항을 통하여 확인 가능합니다.
2. 쿠폰은 현금으로 환급될 수 없으며, 쿠폰에 표시된 유효기간이 만료되거나 이용계약이 종료되면 소멸합니다.
3. “회사”는 “이용자”가 부정한 목적과 방법으로 쿠폰 등을 획득하거나 사용하는 사실이 확인될 경우, 해당 이용자에 대한 쿠폰을 회수 또는 소멸시키거나 회원자격을 제한할 수 있습니다.
4. 쿠폰의 제공내용 및 운영방침은 “회사”의 정책에 따라 달라질 수 있습니다.


제 18조(예약 및 결제)

1. “재화 등”에 대한 매매계약은“판매자”가 제시한 상품의 판매 조건에 응한 “이용자”가 청약의 의사표시를 하고, 이에 대하여 “판매자”가 승낙의 의사표시를 함으로써 “회원”간 청약이 체결됩니다.
2. “이용자”는 다음 방법에 의한 구매를 신청할 수 있습니다.
1) 예약신청 서비스(수취인 정보의 입력 및 결제수단의 선택 포함)
3. “회사”가 “판매자” 등 제 3자에게 이용자의 개인정보를 제공할 필요가 있는 경우 ① 개인정보를 제공받는 자, ② 개인정보를 제공받는 자의 개인정보 이용목적, ③ 제공하는 개인정보의 항목, ④ 개인정보를 제공받는 자의 개인정보 보유 및 이용기간을 이용자에게 알리고 동의를 받습니다.
4. “회사”가 제3자에게 이용자의 개인정보를 취급할 수 있도록 업무를 위탁하는 경우에는 ① 개인정보 취급위탁을 받는 자, ② 개인정보 취급위탁을 하는 업무의 내용을 구매자에게 알리고 동의를 받습니다. 다만, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」에서 정하고 있는 방법으로 개인정보 취급방침을 통해 알림으로써 동의절차를 갈음할 수 있습니다.
5. “이용자”가 전화문의를 통해 “판매자”에게 직접 결제를 경우, 회사는 결제내역 및 취소, 환불, 거래정보 등에 대해 관여하거나, 이에 대한 일체의 책임을 부담하지 않습니다.
6. “회사”는 예약신청 서비스에 의한 대금지급방법으로 신용카드 결제, 핸드폰 결제, 포인트, 기타 “회사”가 추가 지정하는 결제수단 등을 제공할 수 있습니다.
7. “이용자”가 예약 신청 서비스를 이용하는 경우 이름, 연락처 등 이용자 정보에 대한 정확한 정보를 기재해야 하며, “이용자”가 입력한 정보 및 그 정보와 관련하여 발생한 책임과 불이익은 “이용자”가 부담합니다.
8. “회사”는 “이용자”의 예약신청 결제내역을 서비스 화면을 통해 확인할 수 있도록 조치하며, 전자상거래등에서의 소비자보호에 관한 법률에 규정에 의해 일정기간 동안 보존 할 수 있습니다.


제 19조(취소-환불)

“회사”가 운영하는 서비스에서 “이용자”가 구매 가능한 “재화 등”은 일정이 있거나, 일정이 정하여 지지 않은 “수강권(교육서비스), 이용권 등”이 있으며, 이 중 “회사”가 고지하는 “재화 등”에 대한 분쟁해결 기준은 다음과 같습니다.

1. 취소 및 환불은 “이용자”가 PG사 결제 후 아래 취소 및 환불 규정에 따라 가능하며, “사이트”를 통해 취소신청을 할 수 있습니다.
“이용자”가 환불, 취소 요청을 하는 경우 관련 법령 및 회사에서 제공하는 분쟁해결 기준에 부합하는 한 “판매자”는 이를 승인하여야 하며, 결제대금 보호서비스에 따라 이용자가 결제한 금액을 “회사”가 환불해줍니다.
“회사”가 운영하는 “서비스”에서 이루어지는 거래 “재화”에 대해 “회사”가 제시하는 분쟁해결 기준은 각 판매 페이지 취소환불규정에 표기되어 있으며, “판매자”의 환불규정에 따라 변경될 수 있습니다.
“회사”는 통신판매중개자로 원칙적으로 “회원” 간 거래에 대하여 환불 의무가 없으며, 당사자간 원활한 분쟁 해결을 위하여 기준을 제시할 뿐이므로 “회사”는 이에 대한 책임을 보증하지 않습니다. “회원” 사이에 분쟁이 발생한 경우 관련 당사자간 해결이 분쟁해결기준보다 앞서므로, “판매자”의 판단 하에 환불규정 기준 이상으로 “회원”에게 환불을 할 수 있습니다.
“재화 등”에 대한 이용이 종료된 후의 환불 등과 관련하여 “회원” 간에 분쟁이 발생한 경우 원칙상 관련 당사자간에 해결을 우선시하며, 상호 합의 이후 “회사”는 이에 대한 책임을 보증하지 않습니다.

2. 취소 환불 규정
“판매자”는 이용자의 “예약 신청”(청약의사표시)에 대해 “예약 가능(청약 체결)” 또는 “예약 불가(청약 미체결)”를 할 수 있습니다.
“예약 대기”는 판매자가 이용자의 예약 신청을 승인 또는 반려하기 전 상태를 의미합니다.
“예약확정”은 판매자가 이용자의 예약 신청을 승인한것으로, 청약이 체결되며, 예약이 확정된 날짜를 “예약일”이라고 합니다.
“예약불가”는 판매자가 이용자의 예약 신청을 반려한 것으로, 청약이 미체결됩니다.

1) 예약대기(“예약확정” 전)
“예약대기”일 경우, 청약 체결 전이므로 취소 요청 시 전체환불 가능합니다.
판매자 미승인시, “예약불가”에 대한 기준은 다음과 같습니다.
(1) 결제일 기준, “예약 희망일”이 3일 이후인 결제건
“예약 희망일” 2일 전까지 “예약확정’” 통보를 받지 못한 경우
(2) 결제일 기준, “예약 희망일”이 2일이내인 결제건
“예약 희망일” 당일 까지 “예약확정” 통보를 받지 못한 경우
(3) “예약 희망일’이 없는 결제건
“결제일” 기준 2일 이내 “예약확정” 통보를 받지못한 경우

2) 예약확정
“예약확정”일 경우, 청약체결된 상태이므로 이용자의 취소요청 시, 청약철회에 대한 취소수수료가
발생하거나 발생하지 않을 수 있습니다.
(1) 전체환불이 되는경우
- “예약일” 7일전 취소 요청 시
-”예약확정” 완료 시간 기준, 1시간 이내 취소 요청 시
-판매자의 사정으로, “예약일” 구매한 서비스를 제공받지 못하였거나, 안내 받은 경우
(2) 부분환불이 되는경우
부분환불의 경우 “원데이클래스”, “1회체험권”, “이용권” 및 “정규 수강권”에 대한 부분환불 배상 비율이 다음과 같이 다르게 적용됩니다.
①원데이클래스, 1회체험권
-예약일 6일전 ~ 2일전 취소시, 결제금액의 10% 배상 후 환불
-예약일 1일 전 취소시, 결제금액의 50% 배상 후 환불
②이용권, 정규 수강권
-예약일 6일전 ~ 2일전 취소시, 결제금액의 5% 배상 후 환불
-예약일 1일 전 취소시, 결제금액의 10% 배상 후 환불
(3) 환불이 불가능한 경우
-”이용자”의 사정으로, “예약일” 당일, 이후 취소 요청시
- “이용자”의 “구매확정” 이후 취소 요청시

3) 예약불가
“예약불가”일 경우, 청약 미체결로, 전체환불됩니다.

3. 환불 처리 기간
환불 처리 기간은 취소 요청 후 “회사” 영업일 기준 24시간 이내입니다.
이용자의 적법한 환불 등 요청에도 불구하고, “판매자”가 “이용자”의 요청시로부터 24시간 이내에 그 요청을 승인하지 않는 경우 해당 거래는 자동적으로 취소되고 구매대금은 이용자에게 환불됩니다. 단, “이용자”는 “판매자”의 환불, 취소의 요청에 대한 승인이 있기 전까지 그 의사를 철회할 수 있습니다.
카드 결제에 대한 환불인 경우, “회사”가 결제대행사에 요청하는 카드의 결제 취소는 즉시 접수되나, 카드사 사정에 따라 7~10영업일 정도의 취소기간이 소요될 수 있습니다. 카드대금 결제일에 따라 청구작업기간이 다를 수 있으며, 자세한 내용은 해당 카드사에서 확인해야 합니다. (단, 주말, 공휴일은 제외)

4. 취소 환불 예외규정
“재화 등”에 대한 이용이 전부 완료 되었으나 아래 해당 사유가 있을 시 환불 가능합니다.
1) “재화 등” 이용 상 문제가 있었다고 판단될 시, 상호 합의 하에 “판매자”가 “이용자”에게 금액을 개인적으로 환불 조치 하는 것은 가능하지만 “회사” 측에서 관여하지 않습니다.
2) “이용자”가 “판매자”에게 문제가 있다고 판단하여 “재화 등”에 대한 이용 중단 및 환불을 요청하는 경우, “회사” 측에서는 개입할 수 있으며 이에 대한 사유 확인과 이용 과정상의 문제가 없었는지 여부를 확인 합니다. 즉, 이용 중 불쾌감 조성, 준비 소홀, 협박, 폭행, 추행, 불법적인 회유 등의 “판매자”의 의무에 맞지 않는 행위를 확인하여, 해당 사실이 발견되는 형사 고발 및 법적인 조치를 가할 수 있습니다. 또한, “판매자”의 자격을 정지 또는 서비스 이용을 제한하는 조치를 취할 수 있습니다.



제 20조(양도금지)

“회원”은 “서비스”의 이용권한, 기타 이용 계약상 지위를 타인에게 양도, 증여할 수 없습니다.


제 21조(책임제한)

1. “회사”는 “회원” 간의 “제화 등”을 중개하는 “서비스”만을 제공할 뿐, 판매하는 당사자가 아니며, “재화 등”에 대한 책임은 “판매자”에게 있습니다.
2. “회사”는 “판매자”가 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관해서는 책임을 지지 않습니다.
3. “회사”는 천재지변 또는 이에 준하는 불가항력으로 인하여 “서비스”를 제공할 수 없는 경우에는 “서비스” 제공에 관한 책임이 면제됩니다.
4. “회사”는 “회원”의 귀책사유로 인한 “서비스” 이용의 장애에 대하여는 책임을 지지 않습니다.
5. “회사”는 “회원”이 게재한 이용후기(리뷰), 별점 평가, 사진 등 정보/자료/사실의 신뢰도, 정확성에 대해서는 책임을 지지 않습니다.
6. “회사”는 제3자가 “서비스” 내 화면 또는 링크된 사이트를 통하여 광고한 제품 또는 “서비스”의 내용과 품질에 대하여 감시할 의무 외 어떠한 책임도 지지 아니합니다.
7. “회사”는 “회원”이 “서비스”를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖에 “서비스”를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.
8. “회사”는 “회원”간 또는 “회원”과 제3자 상호간에 서비스를 매개로 하여 거래 등을 한 경우에는 책임이 면제됩니다.
9. “회사” 및 “회사”의 임직원 그리고 대리인은 고의 또는 중대한 과실이 없는 한 다음과 같은 사항으로부터 발생하는 손해에 대해 책임을 지지 아니합니다.
1) 회원 정보의 허위 또는 부정확성에 기인하는 손해
2) 서비스에 대한 접속 및 서비스의 이용과정에서 “회원”의 귀책사유로 발생하는 손해
3) 서버에 대한 제3자의 모든 불법적인 접속 또는 서버의 불법적인 이용으로부터 발생하는 손해 및 제3자의 불법적인 행위를 방지하거나 예방하는 과정에서 발생하는 손해
4) 제3자가 서비스를 이용하여 불법적으로 전송, 유포하거나 또는 전송, 유포되도록 한 모든 바이러스, 스파이웨어 및 기타 악성 프로그램으로 인한 손해

제 22조(개인정보보호)

(1) "회사"는 "회원"의 개인정보를 보호하기 위하여 정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 개인정보 보호법 등 관계 법령에서 정하는 바를 준수합니다. 개인정보의 보호 및 사용에 대해서는 관련법령 및 "회사"의 개인정보취급방침이 적용됩니다.
(2) "회사"는 "회원"의 개인정보를 보호하기 위하여 개인정보취급방침을 제정, "서비스" 초기화면에 게시합니다. 다만, 개인정보취급방침의 구체적 내용은 연결화면을 통하여 볼 수 있습니다.
(3) "회사"는 이용계약을 위하여 "회원"이 제공한 정보를 "회사"의 "서비스" 운영을 위한 목적 이외의 용도로 사용하거나 "회원"의 동의 없이 제3자에게 제공하지 않습니다. 단, 다음 각 호의 경우에는 예외로 합니다.
1) 법령에 근거하여 회원정보의 이용과 제3자에 대한 정보제공이 허용되는 경우
2) 배송업무 등 거래 이행에 필요한 최소한의 회원정보(성명, 주소, 연락처 등)를 배송업체에 알려주는 경우
3) 기타 "회사"의 약관 및 정책에 따라 "회원"의 동의를 구한 경우
(4) "회사"가 제3자에게 "재화 등"을 구매한 회원의 개인정보를 제공·위탁할 필요가 있는 경우 실제 예약 신청 시 "회원"의 동의를 받아야 하며, 회원가입 시 미리 포괄적으로 동의를 받지 않습니다. 이 때 "회사"는 제공되는 개인정보 항목, 제공받는 자, 제공받는 자의 개인정보 이용 목적 및 보유‧이용 기간 등을 "회원"에게 명시하여야 합니다. 다만 정보통신망이용촉진 및 정보보호 등에 관한 법률 제25조 제1항에 의한 개인정보 취급위탁의 경우 등 관련 법령에 달리 정함이 있는 경우에는 그에 따릅니다.


제 23조(분쟁의 해결)

1. “회사”는 “회원”이 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 고객상담 및 피해보상처리기구를 설치・운영합니다.
2. “회사”는 “회원”으로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.
3. “회사”와 “회원” 간에 발생한 전자상거래 분쟁과 관련하여 판매자 또는 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.

제 24조(준거법 및 관할법원)

1. 이 약관의 해석 및 “회사”와 “회원”간의 분쟁에 대하여는 대한민국의 법을 적용합니다.
2. 서비스 이용 중 발생한 “회사”와 “회원” 간의 소송은 부산지방법원에 제소합니다.


부칙 이 약관은 2023년 03월 07일부터 시행됩니다.
                                </textarea>
                                <div className="mt-3 d-flex justify-content-end" id="agreeContainer">
                                    <label className="justify-content-end"><input type="checkbox" id="agree" name="agree"  checked={isAgree} onChange={handleAgree} /> 이용약관에 동의합니다.</label>
                                </div>
                            </Col>
                        </Row>

                        <Row style={{marginBottom:"100px"}}>
                            <Col className={"offset-3 col-6 d-flex justify-content-center"}>
                                <button className="joinSubmitButton" onClick={handleSubmit}>수정하기</button>
                            </Col>
                        </Row>
                    </div>

                </Col>
            </Row>
        </div>
    )
}