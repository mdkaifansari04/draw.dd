import Canvas from "@/components/canvas/canvas-container";
import { HTTP_BACKEND_URL } from "@/config";
import axios from "axios";

interface Message {
  id: number;
  message: string;
  createdAt: string;
  userId: string;
  roomId: string;
}

async function getRoomId(slug: string): Promise<string | undefined> {
  try {
    console.log(slug);
    const { data } = await axios.get(`${HTTP_BACKEND_URL}/room/${slug}`);
    return data.data.id;
  } catch (error) {
    console.log("error", error);
  }
}

async function getExistingShapes(roomId: string): Promise<Message[] | undefined> {
  try {
    const { data } = await axios.get(`${HTTP_BACKEND_URL}/chats/${roomId}`);
    console.log("data, ", data.data);
    return data.data;
  } catch (error) {
    console.log("error ", error);
  }
}
async function page({ params }: { params: { roomSlug: string } }) {
  const { roomSlug } = await params;
  const roomId = await getRoomId(roomSlug);
  const messages = await getExistingShapes(roomId!);

  const existingShape =
    messages &&
    messages.map((message: Message) => {
      return JSON.parse(message.message);
    });

  return <Canvas existingShape={existingShape ?? []} roomId={roomId!} />;
}

export default page;
