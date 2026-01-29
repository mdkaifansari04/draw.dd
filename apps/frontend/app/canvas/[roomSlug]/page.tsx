import Canvas from "@/components/canvas/canvas-container";
import { HTTP_BACKEND_URL } from "@/config";
import axios from "axios";

async function getRoomId(slug: string): Promise<string | undefined> {
  try {
    console.log(slug);
    const { data } = await axios.get(`${HTTP_BACKEND_URL}/room/${slug}`);
    console.log("res", data.data);

    return data.data.id;
  } catch (error) {
    console.log("error", error);
  }
}
async function page({ params }: { params: { roomSlug: string } }) {
  const { roomSlug } = await params;
  const roomId = await getRoomId(roomSlug);

  return <Canvas roomId={roomId!} />;
}

export default page;
