"use client";
import { useAppSelector } from "@/store/useAppSelector";
import Button from "../Button";
import { useState } from "react";
import Input from "../Input";
import TextArea from "../TextArea";

export const text = `
<i><p>
Hello Students, <br />
We are excited to announce a Live Career Advice Session on October 25th at 11:00 AM (WAT), exclusively for users! Join us as industry experts share insights on preparing for the job market, building a strong resume, and acing interviews. This is a great opportunity to ask questions and get personalized advice on your career path.
<br /><br />
<b>Topics Covered:</b><br />
How to Craft a Winning Resume, Tips for Networking in Your Field, Interview Do's and Don'ts, Career Growth Strategies.
<br /><br />
Simply Add to your schedule by clicking on the 'Add to Schedule’ button below. Don’t miss out on this chance to gain valuable insights that can boost your career!
<br /><br />
For more information, reach out to our team at <a href="mailto:">career@edulinker.com</a>.
<br /><br />
Looking forward to seeing you there!
<br /><br />
Best Regards,<br />
Dr. Amarachi Orji
</p></i>
`;

const AnnouncementModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    auth: { user },
  } = useAppSelector((s) => s);
  const role = user?.role;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="absolute left-0 top-0 z-[101] h-screen w-screen bg-black bg-opacity-10"
        ></div>
      )}
      <div
        className={`absolute z-[101] h-full top-0 ${
          isOpen
            ? "right-0"
            : "-right-[100%] md:-right-[500px] lg:-right-[720px]"
        } bg-[#F9FAFB] w-full md:max-w-[500px] lg:max-w-[720px] transition-[right] easein duration-[750ms]`}
      >
        <div className="bg-white h-20 lg:h-[108px] border-b border-[#F3F3F3] flex items-center px-5 gap-3 sticky top-0">
          <Button
            onClick={onClose}
            size="sm"
            btnType="outline"
            className="px-3 !border-[#F3F3F3]"
          >
            <img src="/arrow-back.svg" alt="arrow-back icon" />
          </Button>
          <small className="text-grey-300 line-clamp-1">
            Annoucements /{" "}
            <span className="text-primary-500">
              Live Career Advice Session: Preparing for the Job Market
            </span>
          </small>
        </div>
        <div className="p-4 md:p-5">
          {isEdit ? (
            <form className="flex flex-col gap-4">
              <Input
                label="Announcements Title"
                placeholder="Input Title here"
              />
              <TextArea
                label="Announcements Details"
                placeholder="Announcements Details"
                className="min-h-[400px]"
              />
              <div className="flex gap-4 items-center">
                <Button
                  onClick={() => setIsEdit(false)}
                  btnType="outline"
                  className="px-6 text-sm"
                  size="md"
                >
                  Cancel
                </Button>
                <Button type="submit" className="px-6 text-sm" size="md">
                  Submit
                </Button>
              </div>
            </form>
          ) : (
            <div className="border border-[#F3F3F3] p-5 rounded-lg bg-white">
              <div className="flex items-center">
                <p className="lg:text-lg leading-[22px] font-medium">
                  Live Career Advice Session: Preparing for the Job Market
                </p>
                {role !== "student" && (
                  <Button
                    onClick={() => setIsEdit(true)}
                    btnType="outline"
                    size="sm"
                    className="ml-auto px-2"
                  >
                    <img src="/pen.svg" alt="edit icon" />
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2">
                {role === "student" && (
                  <small className="text-grey-300 leading-[20px] flex items-center gap-1">
                    <img src="/user.svg" alt="user icon" />{" "}
                    <span className="mt-1">Dr. Amarachi Orji</span>
                  </small>
                )}
                <small className="text-grey-300 leading-[20px] flex items-center gap-1">
                  <img src="/calendar.svg" alt="calendar icon" />{" "}
                  <span className="mt-1">15 Oct 2024</span>
                </small>
                <small className="text-grey-300 leading-[20px] flex items-center gap-1">
                  <img src="/clock.svg" alt="clock icon" />{" "}
                  <span className="mt-1">10:10 PM</span>
                </small>
              </div>
              <div className="mt-6 ml-3 pl-5 border-l-2 border-[#F3F3F3]">
                <p
                  className="text-sm md:text-basetext-grey-400 wysiwyg-render"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AnnouncementModal;
