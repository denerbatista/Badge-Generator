import { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import logo from "../../assets/logo.png"; // importa a imagem da logo da Cidade de Aracruz
import logoMarioLeal from "../../assets/logoMarioLeal.png"; // importa a imagem da logo da Cidade de Aracruz
import backgroundLogoMarioLeal from "../../assets/backgroundLogoMarioLeal.png"; // importa a imagem da background do crachá
import backgroundBadge from "../../assets/background.png"; // importa a imagem da background do crachá
import backgroundBadge2 from "../../assets/background2.png"; // importa a imagem da background do crachá


function BadgeGenerator() {
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [institutionName] = useState<string>("CMEB Mário Leal Silva");
  const [functionName, setFunctionName] = useState<string>("");
  const [functionNameConvert, setFunctionNameConvert] = useState<string>("");
  const [type, setType] = useState<boolean>(true);

  const [photo, setPhoto] = useState<File | null>(null);

  function handleFunctionNameChange(event: ChangeEvent<HTMLInputElement>) {
    setFunctionName(event.target.value);
    setFunctionNameConvert(`Função: ${functionName} `);
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleIdChange(event: ChangeEvent<HTMLInputElement>) {
    setId(event.target.value);
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setPhoto(event.target.files[0]);
    }
  }

  function handleGeneratePDFType1() {
    const photoBlob = new Blob([photo as File], { type: "image/png" });
    const photoURL = URL.createObjectURL(photoBlob);

    const img = new Image();
    img.src = photoURL;

    img.onload = () => {
      const doc = new jsPDF({
        orientation: "p",
        unit: "pt",
        format: [200, 300],
      });

      // adicionar imagem de fundo
      const background = new Image();
      background.src = backgroundBadge;
      doc.addImage(background, "JPEG", 0, 0, 200, 300);

      doc.setFontSize(12);
      doc.addImage(logo, "PNG", 68, 50, 60, 40);
      doc.setFont("Arial", "bold");
      
      doc.setFontSize(12);
      doc.text(institutionName, 100, 110, { align: "center" });
      doc.setFontSize(16);
      doc.setFont("Arial", "bold");
      doc.text(name, 100, 245, { align: "center" });
      doc.setFontSize(12);
      doc.setFont("Arial", "");
      doc.setFontSize(30);
      doc.setFont("Arial", "");
      doc.setFontSize(14);
      doc.text(functionNameConvert, 100, 265, { align: "center" });
      doc.text(`Matrícula: ${id}`, 100, 265 + 20, { align: "center" });

      doc.addImage(photoURL, "PNG", 68, 125, 60, 80);

      doc.save("badge.pdf");
    };
  }

  function handleGeneratePDFType2() {
    const doc = new jsPDF({
      orientation: "l",
      unit: "pt",
      format: [400, 200],
    });

    // adicionar imagem de fundo
    const background = new Image();
    background.src = backgroundBadge;
    doc.addImage(background, "JPEG", 0, 0, 400, 200);

    doc.setFontSize(12);
    doc.addImage(logo, "PNG", 60, 60, 100, 60);
    doc.setFont("Arial", "bold");
    doc.setFontSize(16);
    doc.text(institutionName, 175, 75);
    doc.setFontSize(30);
    doc.setFont("Arial", "");
    doc.setFontSize(14);
    doc.text(functionNameConvert, 175, 95);
    doc.setFontSize(30);
    doc.setFont("Arial", "bold");
    doc.text(name, 200, 180, { align: "center" });
    doc.setFontSize(14);
    doc.setFont("Arial", "");
    doc.text(`Matrícula: ${id}`, 175, 115);

    doc.save(`${name}-badge.pdf`);
  }

  function handleGeneratePDFType3() {
    const doc = new jsPDF({
      orientation: "l",
      unit: "pt",
      format: [400, 200],
    });

    // adicionar imagem de fundo
    const background = new Image();
    background.src = backgroundBadge2;
    doc.addImage(background, "JPEG", 0, 0, 400, 200);

    doc.setFontSize(12);
    // doc.addImage(logo, "PNG", 15, 60, 150, 110);
    doc.addImage(backgroundLogoMarioLeal, "PNG", 15, 8, 160, 180);
    doc.addImage(logoMarioLeal, "PNG", 35,18, 120, 140);
    doc.setFont("Arial", "bold");
    doc.setFontSize(16);
    doc.text(functionNameConvert, 280, 135, { align: "center" });
    doc.setFontSize(70);
    doc.setFont("Arial", "bold");
    doc.text(name, 280, 110, { align: "center" });
    doc.setFontSize(14);
    doc.setFont("Arial", "");
    doc.text(`Matrícula: ${id}`, 280, 155, { align: "center" });

    doc.save(`${name}-badge.pdf`);
  }


  return (
    <Box>
      <Stack spacing={3}>
        <FormControl>
          <FormLabel>Nome Completo:</FormLabel>
          <Input type="text" value={name} onChange={handleNameChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Função:</FormLabel>
          <Input
            type="text"
            value={functionName}
            onChange={handleFunctionNameChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Matrícula:</FormLabel>
          <Input type="text" value={id} onChange={handleIdChange} />
        </FormControl>

        <Flex>
          <Checkbox isChecked={type} onChange={() => setType(true)}>
            Tipo com foto
          </Checkbox>
          <Checkbox isChecked={!type} onChange={() => setType(false)}>
            Tipo sem foto
          </Checkbox>
        </Flex>
        <FormControl display={type ? "block" : "none"}>
          <FormLabel>Adicionar foto:</FormLabel>
          <Flex alignItems="center">
            <Input type="file" onChange={handlePhotoChange} />
          </Flex>
        </FormControl>

        <Button
          onClick={type ? handleGeneratePDFType1 : handleGeneratePDFType3}
        >
          Gerar PDF
        </Button>
      </Stack>
    </Box>
  );
}

export default BadgeGenerator;
