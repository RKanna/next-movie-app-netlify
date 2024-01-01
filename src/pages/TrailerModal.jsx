"use client";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getMovieTrailers } from "../utils/requests.js";
import LoadingSpin from "react-loading-spin";
import { motion } from "framer-motion";

const TrailerModal = ({ params }) => {
  const [openModal, setOpenModal] = useState(false);
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setOpenModal(false);
    setLoading(false);
  };
  const handleShow = () => {
    setOpenModal(true);
    if (loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  //commented for fixing the building error, the code is correct but its not handling the params so it result in error during the building of project so adding this will prevent the error while building ->  if (!params) { return;}

  // useEffect(() => {
  //   const fetchTrailers = async () => {
  //     try {
  //       const fetchedTrailers = await getMovieTrailers(params.id);
  //       setTrailers(fetchedTrailers);
  //     } catch (error) {
  //       console.error("Error fetching trailers:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTrailers();
  // }, [params.id]);

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        if (!params) {
          return;
        }

        const fetchedTrailers = await getMovieTrailers(params.id);
        setTrailers(fetchedTrailers);
      } catch (error) {
        console.error("Error fetching trailers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailers();
  }, [params]);

  // for filtering official trailer only
  const officialTrailers = trailers.filter(
    (trailer) => trailer.name === "Official Trailer"
  );

  return (
    <>
      <motion.button
        className="btn btn-primary"
        onClick={handleShow}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        View Trailer
      </motion.button>

      <section className="container my-3">
        {officialTrailers.map((trailer) => (
          <Modal
            key={trailer.id}
            show={openModal}
            onHide={handleClose}
            className="modal-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>{trailer.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {loading && <LoadingSpin />}
              <div key={trailer.id}>
                <p>Published At: {trailer.published_at}</p>
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  frameBorder="0"
                  allowFullScreen
                  style={{ borderRadius: "0.5rem" }}
                ></iframe>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-danger" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        ))}
      </section>
    </>
  );
};

export default TrailerModal;
