"use client";
import React, { useEffect, useState } from "react";
import {
  getDocs,
  query,
  collection,
  updateDoc,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Button, Menu, MenuItem } from "@mui/material";
import { DialogActions, TextField } from "@mui/material";
import {
  bigHighlightedLineModel,
  paragraphModel,
  routineModel,
  smallItalicLineModel,
  boldLine,
  highlightedParagraphModel,
  largeItalicLineModel,
  largeLineModel,
  mediumItalicLineModel,
  mediumLineModel,
  smallLineModel,
  captionModel,
  codeBlockModel,
  headingModel,
  horizontalRuleModel,
  listItemModel,
  quoteModel,
  space10Model,
  space20Model,
  space30Model,
  tagModel,
} from "../../models/dataModels";
import Space16 from "@/components/backend/Space16";

const BlogsEditPage = ({ id }) => {
  const [routineData, setRoutineData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [openContainer, setOpenContainer] = useState(false);
  const [openOtherData, setOpenOtherData] = useState(false);
  const [main, setMain] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [count, setCount] = useState(0);

  const handleOpenDialog = (model) => {
    setSelectedModel(model);
    setOpenDialog(true);
  };


  const handleCount = () => {
    setCount(count + 1);
  };


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenOtherData(false);
    setOpenContainer(false);
  };


  const handleOpenMainMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleOpenLinesMenu = (event) => {
    setAnchorEl2(event.currentTarget);
  };


  const handleOpenSpaceMenu = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleCloseSpaceMenu = () => {
    setAnchorEl3(null);
  };


  const handleCloseLinesMenu = () => {
    setAnchorEl2(null);
  };


  const handleCloseMainMenu = () => {
    setAnchorEl(null);
  };
  const handleDelete = async (index) => {
    try {
      const routineDocRef = doc(db, "routines", id);
      const routineDocSnapshot = await getDoc(routineDocRef);

      if (routineDocSnapshot.exists()) {
        const content = routineDocSnapshot.data().content;
        if (index >= 0 && index < content.length) {
          const updatedContent = [
            ...content.slice(0, index),
            ...content.slice(index + 1),
          ];

          await updateDoc(routineDocRef, { content: updatedContent });

          console.log("Object deleted successfully.");
          fetchRoutineData();
        } else {
          console.error("Index out of bounds.");
        }
      } else {
        console.error("Routine document not found.");
      }
    } catch (error) {
      console.error("Error deleting object:", error);
    }
  };
  const fetchRoutineData = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "routines"), where("id", "==", id))
    );
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs.map((doc) => {
        const routine = doc.data();

        return {
          title: routine.title,
          id: routine.id,
          count: routine.count,
          description: routine.description,
          heroImage: routine.heroImage,
          timestamp: routine.timestamp,
          content: routine.content || [],
        };
      });
      console.log(data[0].count);
      setCount(data[0].count);
      setRoutineData(data[0]);
    } else {
    }
  };
  useEffect(() => {
    fetchRoutineData();
  }, []);
  const sortedContent =
    routineData?.content?.length > 0
      ? routineData.content.sort((a, b) => a.sno - b.sno)
      : routineData;
  return (
    <>
      <div className="w-[100%] pb-36 bg-white absolute z-10 top-0 left-0">
        <div className="flex h-full z-20">
          <div>
            <div>
              <div
                style={{
                  backgroundImage: `url(${routineData?.heroImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                className="  pl-20 pr-20 pt-20 pb-20 h-[600px] text-pink-500 text-center lemonada z-10"
              >
                <Space16 />
                <Space16 />
                {!routineData ? (
                  <></>
                ) : (
                  <>
                    <div className="text-6xl allura text-black">
                      {routineData.title}
                    </div>
                    <div className="text-6xl allura text-black">
                      {routineData.description}
                    </div>
                  </>
                )}
              </div>
              {routineData?.content?.length > 0 ? (
                <div className="p-5 md:p-20 space-y-5 text-justify montserrat_Alternates">
                  {sortedContent?.map((item, index) => {
                    switch (item.type) {
                      case "paragraph":
                        return (
                          <div key={index} className="space-y-3 text-[20px]">
                            <h3>{item.heading}</h3>
                            <p>{item.content}</p>
                            <p>
                              <i className="text-red-300">{item.italicLine}</i>
                            </p>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              Delete
                            </button>
                          </div>
                        );
                      case "list":
                        return (
                          <div key={index}>
                            <h3>{item.heading}</h3>
                            <ul className="p-5">
                              {item.listItems.map((listItem, listItemIndex) => (
                                <li
                                  key={listItemIndex}
                                  className="text-red-300 font-semibold text-[20px]"
                                >
                                  {listItemIndex + 1}. {listItem.heading} :
                                  <span className="pl-3 text-black font-normal text-[18px]">
                                    {listItem.content}
                                  </span>
                                </li>
                              ))}
                              <button
                                onClick={() => handleDelete(index)}
                                className="bg-red-500 rounded-lg p-3 text-white"
                              >
                                Delete
                              </button>
                            </ul>
                          </div>
                        );
                      case "bigHighlightedLine":
                        return (
                          <div key={index} className="bg-red-300 w-fit px-2">
                            {item.content}
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              Delete
                            </button>
                          </div>
                        );
                      case "smallItalicLine":
                        return (
                          <div key={index}>
                            <i className="text-blue-300 italic">
                              {item.content}
                            </i>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              Delete
                            </button>
                          </div>
                        );
                      case "gallery":
                        return (
                          <div key={index}>
                            <h3>{item.heading}</h3>
                            {!item.imgUrls ? (
                              <></>
                            ) : (
                              <div>
                                {item.imgURLs.map((imgUrl, imgIndex) => (
                                  <img
                                    key={imgIndex}
                                    src={imgUrl}
                                    alt={`Image ${imgIndex}`}
                                  />
                                ))}
                              </div>
                            )}
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              Delete
                            </button>
                          </div>
                        );
                      case "steps":
                        return (
                          <div key={index}>
                            <h2>{item.heading}</h2>
                            <ol>
                              {item.steps.map((step, stepIndex) => (
                                <li key={stepIndex}>{step.content}</li>
                              ))}
                            </ol>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              Delete
                            </button>
                          </div>
                        );
                      case "quote":
                        return (
                          <div key={index}>
                            <blockquote>
                              <p>{item.text}</p>
                              <footer>{item.author}</footer>
                            </blockquote>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              Delete
                            </button>
                          </div>
                        );
                      case "caption":
                        return (
                          <div key={index}>
                            <p>{item.text}</p>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              Delete
                            </button>
                          </div>
                        );
                      case "heading":
                        return (
                          <div key={index}>
                            <p className="text-5xl text-bold">{item.text}</p>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              Delete
                            </button>
                          </div>
                        );
                      case "tag":
                        return (
                          <div key={index}>
                            <span>{item.text}</span>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              Delete
                            </button>
                          </div>
                        );
                      case "listItem":
                        return (
                          <div key={index}>
                            <li>{item.text}</li>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              Delete
                            </button>
                          </div>
                        );
                      case "codeBlock":
                        return (
                          <div key={index} className="bg-gray-100 p-3">
                            <pre>
                              <code>{item.code}</code>
                              <button
                                onClick={() => handleDelete(index)}
                                className="bg-red-500 rounded-lg p-3 text-white"
                              >
                                Delete
                              </button>
                            </pre>
                          </div>
                        );
                      case "space10":
                        return (
                          <>
                            {" "}
                            <div key={index} className="w-full h-[10px]"></div>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              Delete
                            </button>
                          </>
                        );
                      case "space20":
                        return (
                          <>
                            {" "}
                            <div key={index} className="w-full h-[20px]"></div>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              Delete
                            </button>
                          </>
                        );
                      case "space30":
                        return (
                          <>
                            {" "}
                            <div key={index} className="w-full h-[30px]"></div>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              Delete
                            </button>
                          </>
                        );
                      case "horizontalRule":
                        return <hr key={index} />;
                      default:
                        return null;
                    }
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* showing the options*/}

          <div
            className=" fixed bottom-0 flex-col bg-rose-300 gap-3 p-10 items-start justify-start w-full
          "
          >
            <div className="text-2xl ">Editing Board</div>
            <Space16 />
            <Space16 />
            {/* Buttons for changes*/}
            <div className="flex gap-4  ">
              <Button
                aria-controls="simple-menu"
                className="text-lg bg-primary hover:bg-green-400 shadow-md text-gray-500"
                aria-haspopup="true"
                onClick={handleOpenMainMenu}
              >
                All
              </Button>
              <Button
                aria-controls="simple-menu-2"
                aria-haspopup="true"
                className="text-xl bg-primary hover:bg-green-400 shadow-md text-gray-500"
                onClick={handleOpenLinesMenu}
              >
                Lines
              </Button>
              <Button
                aria-controls="simple-menu-3"
                aria-haspopup="true"
                className="text-xl bg-primary hover:bg-green-400 shadow-md text-gray-500"
                onClick={handleOpenSpaceMenu}
              >
                Spaces
              </Button>
            </div>
            {/* All DropDowns for changes*/}

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMainMenu}
            >
              {[
                bigHighlightedLineModel,
                paragraphModel,
                routineModel,
                smallItalicLineModel,
                boldLine,
                highlightedParagraphModel,
                largeItalicLineModel,
                largeLineModel,
                mediumItalicLineModel,
                mediumLineModel,
                smallLineModel,
                captionModel,
                codeBlockModel,
                headingModel,
                horizontalRuleModel,
                listItemModel,
                quoteModel,
                tagModel,
              ].map((model, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleOpenDialog(model);
                    handleCloseMainMenu();
                  }}
                >
                  {model.name}
                </MenuItem>
              ))}
            </Menu>
            <Menu
              id="simple-menu-2"
              anchorEl={anchorEl2}
              keepMounted
              open={Boolean(anchorEl2)}
              onClose={handleCloseLinesMenu}
            >
              {[
                bigHighlightedLineModel,
                smallItalicLineModel,
                boldLine,
                largeItalicLineModel,
                largeLineModel,
                mediumItalicLineModel,
                mediumLineModel,
                smallLineModel,
              ].map((model, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleOpenDialog(model);
                    handleCloseLinesMenu();
                  }}
                >
                  {model.name}
                </MenuItem>
              ))}
            </Menu>
            <Menu
              id="simple-menu-3"
              anchorEl={anchorEl3}
              keepMounted
              open={Boolean(anchorEl3)}
              onClose={handleCloseSpaceMenu}
            >
              {[space10Model, space20Model, space30Model].map(
                (model, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleOpenDialog(model);
                      handleCloseLinesMenu();
                    }}
                  >
                    {model.name}
                  </MenuItem>
                )
              )}
            </Menu>
            <DataEntryDialog
              open={openDialog}
              handleClose={handleCloseDialog}
              model={selectedModel}
              id={id}
              fetchRoutineData={fetchRoutineData}
              count={count}
              handleCount={handleCount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const DataEntryDialog = ({
  open,
  handleClose,
  model,
  id,
  fetchRoutineData,
  handleCount,
  count,
}) => {
  const [formData, setFormData] = useState({});
  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
      type: model.type,
      sno: count + 1,
      name: model.name,
    });
  };
  console.log(formData);

  const handleSubmit = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "routines"), where("id", "==", id))
      );
      const doc = querySnapshot.docs[0];
      const updatedContent = [
        ...doc.data().content,
        { ...formData, sno: count + 1 },
      ];
      await updateDoc(doc.ref, { content: updatedContent, count: count + 1 });
      fetchRoutineData();
    } catch (error) {
      console.error("Error adding data:", error);
    }
    setFormData({});
    handleClose();
    handleCount();
  };

  return (
    <dialog className="fixed inset-0" open={open} onClose={handleClose}>
      <h1>Add Data</h1>
      <div>
        {model &&
          Object.keys(model)
            ?.filter((key) => key !== "type")

            .map((key) => (
              <TextField
                key={key}
                label={key}
                FormHelperTextProps={false}
                SelectProps={false}
                value={formData[key] || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            ))}
      </div>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </dialog>
  );
};

export default BlogsEditPage;
