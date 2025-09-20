import Notes from "./Notes";

const Home = ({ showAlert, darkMode }) => {
  return (
    <div>
      <Notes showAlert={showAlert} darkMode={darkMode} />
    </div>
  );
};

export default Home;
