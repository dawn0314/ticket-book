import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ExtendedTicketInfoType, TicketInfoType } from "@type/ticket";

type UseTicketsOption = {
  id?: string; // 티켓 ID
};

export default function useTickets({ id }: UseTicketsOption) {
  const [tickets, setTickets] = useState<ExtendedTicketInfoType[]>([]);
  const [ticket, setTicket] = useState<ExtendedTicketInfoType | undefined>(
    undefined
  );
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      const user = auth.currentUser;
      setLoading(true);
      setError(null);

      try {
        if (!user) {
          throw new Error("로그인된 사용자가 없습니다.");
        }

        if (id) {
          // 특정 ID에 해당하는 단일 티켓 가져오기
          const ticketDoc = doc(db, "users", user.uid, "tickets", id);
          const ticketSnapshot = await getDoc(ticketDoc);
          if (ticketSnapshot.exists()) {
            const data = ticketSnapshot.data() as {
              ticketInfo: TicketInfoType;
              photo: string[];
            };
            setTicket({ id: ticketSnapshot.id, ...data });
          } else {
            console.log("티켓을 찾을 수 없습니다.");
          }
        } else {
          // 전체 티켓 목록 가져오기
          const ticketQuery = query(
            collection(db, "users", user.uid, "tickets"),
            where("userId", "==", user.uid)
          );
          const snapshot = await getDocs(ticketQuery);
          const userTickets = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as ExtendedTicketInfoType[];

          setTickets(userTickets);
          setTotalPage(Math.ceil(userTickets.length / 4));
        }
      } catch (err) {
        console.error("Error fetching tickets: ", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [id]);

  return { tickets, ticket, totalPage, loading, error };
}
