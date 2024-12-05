import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { sharedButton } from "../components/sharedStyles.ts";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { TicketInfoType } from "../types/ticket.ts";
import {
  SetlistForm,
  AddPhoto,
  DetailsForm,
  ReviewForm,
  UserButton,
} from "../components/index";

export default function CreateTicket() {
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

  const onSaveTicket = async () => {
    const user = auth.currentUser;
    const confirm = window.confirm("티켓을 저장하시겠습니까?");

    if (confirm && user) {
      const doc = await addDoc(collection(db, "users", user.uid, "tickets"), {
        ticketInfo,
        createdAt: Date.now(),
        username: user?.displayName || "Anonymous",
        userId: user?.uid,
      });

      if (files.length > 0) {
        const uploadPromise = files.map(async (file, index) => {
          const locationRef = ref(
            storage,
            `tickets/${user?.uid}-${user?.displayName}/${doc.id}/${index}`
          );
          const result = await uploadBytes(locationRef, file);
          return getDownloadURL(result.ref);
        });

        const photoUrls = await Promise.all(uploadPromise);
        await updateDoc(doc, {
          photo: photoUrls,
        });
      }
      navigate("/ticket-list");
    }
  };

  return (
    <Wrapper>
      <FlexContainer>
        <AddPhoto setTicketInfo={setTicketInfo} setFiles={setFiles} />
        <ReviewForm setTicketInfo={setTicketInfo} />
      </FlexContainer>
      <FlexContainer>
        <DetailsForm ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
        <SetlistForm setTicketInfo={setTicketInfo} />
      </FlexContainer>
      <AddButton onClick={onSaveTicket}>Add Ticket</AddButton>
      <UserButton />
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

  @media screen and (min-width: 1450px) {
    display: grid;
    grid-template-columns: 800px 1fr;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 30px;

  @media screen and (min-width: 1450px) {
    flex-direction: column;
  }
  @media screen and (max-width: 1150px) {
    flex-direction: column;
  }
`;
const AddButton = styled.button`
  width: 150px;
  height: 45px !important;
  padding: 12px !important;
  font-weight: 600;
  border: none;
  background-color: var(--accent) !important;
  color: #fff;
  margin-left: auto;
  ${sharedButton}
  box-shadow: 0px 2px 7px #818181 !important;
  &:active {
    box-shadow: 0px 4px 8px #686662 !important;
    transform: scale(0.98);
  }
  @media screen and (min-width: 1450px) {
    margin-right: -530px;
  }
`;
