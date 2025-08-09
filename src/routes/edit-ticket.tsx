import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { sharedButton } from "../components/sharedStyles.ts";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { TicketInfoType } from "@type/ticket";
import {
  SetlistForm,
  AddPhoto,
  DetailsForm,
  ReviewForm,
  UserButton,
} from "../components/index";
import useTickets from "../hooks/useTickets";

export default function EditTicket() {
  const { id } = useParams<{ id: string }>();
  const { ticket, loading, error } = useTickets({ id });
  const [files, setFiles] = useState<File[]>([]);
  const [ticketInfo, setTicketInfo] = useState<TicketInfoType>({
    mainPhoto: 0,
    photo: [],
    title: "",
    date: "",
    time: "",
    location: "",
    seat: "",
    selectedTracks: [],
    review: "",
  });

  const navigate = useNavigate();

  // 기존 티켓 데이터 로드
  useEffect(() => {
    if (ticket) {
      setTicketInfo(ticket.ticketInfo);
    }
  }, [ticket]);

  const onCancelEditing = () => {
    const confirm = window.confirm(
      "티켓 편집을 취소하시겠습니까? 수정한 내용은 사라집니다."
    );

    if (confirm) {
      navigate(`/ticket-list/${id}`);
    }
  };

  const onSaveTicket = async () => {
    const user = auth.currentUser;
    const confirm = window.confirm("티켓을 수정하시겠습니까?");

    if (confirm && user && id) {
      try {
        // 새로 업로드할 사진들 처리
        let newPhotoUrls: string[] = [];
        if (files.length > 0) {
          const uploadPromise = files.map(async (file, index) => {
            const locationRef = ref(
              storage,
              `tickets/${user?.uid}-${
                user?.displayName
              }/${id}/${Date.now()}-${index}`
            );
            const result = await uploadBytes(locationRef, file);
            return getDownloadURL(result.ref);
          });

          newPhotoUrls = await Promise.all(uploadPromise);
        }

        // 기존 사진들과 새로 업로드된 사진들을 합침
        const existingPhotos = ticketInfo.photo.filter(
          (url) => !url.startsWith("blob:")
        );
        const finalPhotoUrls = [...existingPhotos, ...newPhotoUrls];

        const ticketRef = doc(db, "users", user.uid, "tickets", id);
        await updateDoc(ticketRef, {
          photo: finalPhotoUrls,
          ticketInfo: {
            ...ticketInfo,
            photo: finalPhotoUrls,
          },
        });

        navigate(`/ticket-list/${id}`);
      } catch (error) {
        console.error("티켓 수정 중 오류 발생:", error);
        alert("티켓 수정 중 오류가 발생했습니다.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!ticket) return <p>티켓을 찾을 수 없습니다.</p>;

  return (
    <Wrapper>
      <FlexContainer>
        <UserButton />
        <Title>티켓 수정</Title>
      </FlexContainer>
      <FormContainer>
        <AddPhoto
          setTicketInfo={setTicketInfo}
          setFiles={setFiles}
          ticket={ticket}
        />
        <DetailsForm ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
        <SetlistForm ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
        <ReviewForm ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
        <ButtonContainer>
          <SaveButton onClick={onSaveTicket}>편집 완료</SaveButton>
          <CancelButton onClick={onCancelEditing}>취소</CancelButton>
        </ButtonContainer>
      </FormContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 100px;
  gap: 30px;
  margin: 0 30px;
  overflow: auto;
  background: var(--light);

  @media screen and (max-width: 1024px) {
    margin: 0;
    padding: 50px 30px;
    width: 100%;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: var(--dark);
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
`;

const SaveButton = styled.button`
  ${sharedButton}
  width: 120px;
  padding: 10px;
  font-size: large;
`;

const CancelButton = styled.button`
  ${sharedButton}
  background-color: white;
  color: black;
  width: 100px;
  padding: 10px;
  font-size: large;
`;
