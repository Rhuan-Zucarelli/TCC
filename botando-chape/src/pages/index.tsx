import { useSession } from "next-auth/react";
import { api } from "next/utils/api";
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { CaloriesChart, CaloriesBurningChart ,GraphicProgress } from "next/components/UI/Graphics";
import { getWeek,CalculateCaloriesWeek,calculateCalorieBurnWeek } from "next/utils/tools";
import { type Food, type Meal,type Exercise, User } from "@prisma/client";
import { useRouter } from "next/router";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type lineChart = {
  User: User,
  calories: number[]
}

export default function Home() {
    const { data: sessionData } = useSession();
    if(!sessionData?.user.id){
      return;
    }

    const user = api.user.getUser.useQuery({ id: sessionData?.user.id });
    const router = useRouter();
    const dataini = new Date();
    dataini.setHours(0, 0, 0, 0);

    const [dataCalories, setDataCalories] = useState(dataini.toISOString());
    const [dataBurn, setDataBurn] = useState(dataini.toISOString());

    const snackOne     = api.meal.getMealfood.useQuery({ userId: sessionData?.user.id, mealType: 'CAFEDAMANHA', dateMeal: dataCalories });
    const snackTwo     = api.meal.getMealfood.useQuery({ userId: sessionData?.user.id, mealType: 'ALMOCO'     , dateMeal: dataCalories });
    const snackThree   = api.meal.getMealfood.useQuery({ userId: sessionData?.user.id, mealType: 'JANTAR'     , dateMeal: dataCalories });
  
    const seg = api.training.getTrainingExercises.useQuery({ userId: sessionData?.user.id, trainingDay:'SEGUNDA'});
    const ter = api.training.getTrainingExercises.useQuery({ userId: sessionData?.user.id, trainingDay:'TERCA'  });
    const qua = api.training.getTrainingExercises.useQuery({ userId: sessionData?.user.id, trainingDay:'QUARTA' });
    const qui = api.training.getTrainingExercises.useQuery({ userId: sessionData?.user.id, trainingDay:'QUINTA' });
    const sex = api.training.getTrainingExercises.useQuery({ userId: sessionData?.user.id, trainingDay:'SEXTA'  });
    const sab = api.training.getTrainingExercises.useQuery({ userId: sessionData?.user.id, trainingDay:'SABADO' });
    const dom = api.training.getTrainingExercises.useQuery({ userId: sessionData?.user.id, trainingDay:'DOMINGO'});

    const [pieChart1, setPieChart1] = useState<number[]>();
    const [pieChart2, setPieChart2] = useState<number[]>();
    const [lineChart, setLineChart] = useState<lineChart>();
    const [showLineChart, setShowLineChart] = useState(false);
    const [week, setWeek] = useState({ today: '', sevenDaysAgo: '' });

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDate2, setSelectedDate2] = useState('');

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.name == 'caloriesDate'){
        let newDate = e.target.value;
        setSelectedDate(newDate);
        setShowDatePicker(false);
        const query = { ...router.query, calories_date: newDate };
        router.push({ pathname: router.pathname, query });
        createCharts();
      }else{
        let newDate = e.target.value;
        setSelectedDate2(newDate);
        setShowDatePicker2(false);
        const query = { ...router.query, burn: newDate };
        router.push({ pathname: router.pathname, query });
        createCharts();
      }
    };

    // Função para alternar a exibição do gráfico de linhas
    const toggleCharts = () => {
        setShowLineChart(!showLineChart);
    };

    const handleCaloriesBTN = () => {
      setShowDatePicker(true);
    };

    const handleBurnBTN = () => {
      setShowDatePicker2(true);
    };

    const createCharts = async () => {

      let snackOneData   = snackOne.data?.mealFood as Food[];
      let snackTwoData   = snackTwo.data?.mealFood as Food[];
      let snackThreeData = snackThree.data?.mealFood as Food[]; 
      let calories = await CalculateCaloriesWeek(snackOneData, snackTwoData, snackThreeData);
      setPieChart1(calories);
     

      let segData = seg.data?.trainingExercise as Exercise[];
      let terData = ter.data?.trainingExercise as Exercise[];
      let quaData = qua.data?.trainingExercise as Exercise[];
      let quiData = qui.data?.trainingExercise as Exercise[];
      let sexData = sex.data?.trainingExercise as Exercise[];
      let sabData = sab.data?.trainingExercise as Exercise[];
      let domData = dom.data?.trainingExercise as Exercise[];

      let burn = await calculateCalorieBurnWeek(segData, terData, quaData, quiData, sexData, sabData, domData);
      setPieChart2(burn);
      
      let userdata = user.data as User;
      setLineChart({
        User: userdata,
        calories: burn
      });
      
    }

    const preExportPDF = async () => {
      const sumir = document.querySelectorAll('.sumir') as NodeListOf<HTMLElement>;
      sumir.forEach(elemento => {
          elemento.style.display = 'none';
      });
      const pdf = new jsPDF();
      const canvasIds = ['canvas1', 'canvas3'];
      for (const [index, canvasId] of canvasIds.entries()) {
        let canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (canvasId === 'canvas3' && (!canvas || canvas.offsetWidth === 0 || canvas.offsetHeight === 0)) {
          
          setShowLineChart(true);
          await new Promise(resolve => setTimeout(resolve, 500));
          canvas = document.getElementById(canvasId) as HTMLCanvasElement;
          if (!canvas || canvas.offsetWidth === 0 || canvas.offsetHeight === 0) {
            console.error('O canvas3 ainda não está visível.');
            continue;
          }
        }

        const canvasImage = await html2canvas(canvas).then(canvas => {
          return canvas.toDataURL('image/png');
        });
        if (index > 0) {
          pdf.addPage();
        }

        // Use offsetWidth e offsetHeight para obter as dimensões atuais do canvas
        const originalWidth = canvas.offsetWidth;
        const originalHeight = canvas.offsetHeight;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const ratio = Math.min(pageWidth / originalWidth, pageHeight / originalHeight);

        // Novas dimensões
        const newWidth = originalWidth * ratio;
        const newHeight = originalHeight * ratio;

        // Centraliza a imagem na página
        const x = (pageWidth - newWidth) / 2;
        const y = (pageHeight - newHeight) / 2;

        // Certifique-se de que as dimensões e coordenadas são válidas
        if (newWidth > 0 && newHeight > 0 && x >= 0 && y >= 0) {
            pdf.addImage(canvasImage, 'PNG', x, y, newWidth, newHeight);
        } else {
            console.error('Dimensões ou coordenadas inválidas para o canvas:', canvasId);
        }
      }
    
      // Salva o PDF.
      pdf.save('graficos.pdf');
    
      // Oculte o canvas3 novamente, se necessário.
      setShowLineChart(false);
      let voltar = document.querySelectorAll('.sumir') as NodeListOf<HTMLElement>;
      voltar.forEach(elemento => {
          elemento.style.display = '';
      });
    };
    
    useEffect(() => {
      createCharts();
      setWeek(getWeek(new Date(dataCalories)));
    }, [snackOne.data, snackTwo.data, snackThree.data, seg.data, ter.data, qua.data, qui.data, sex.data, sab.data, dom.data]); // Dependências para quando o useEffect deve ser re-executado

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const newDateCalories = router.query.calories_date ? new Date(router.query.calories_date as string) : new Date();
        newDateCalories.setHours(0, 0, 0, 0);
        setDataCalories(newDateCalories.toISOString());
  
        const newDateBurn = router.query.burn ? new Date(router.query.burn as string) : new Date();
        newDateBurn.setHours(0, 0, 0, 0);
        setDataBurn(newDateBurn.toISOString());
      }
    }, [router.query.calories_date, router.query.burn]);
    return (

      <>
        <div id="canvas1" className={`p-10 ${showLineChart ? 'hidden' : ''}`}>
          <div className="flex flex-wrap-mx-4">
            {/* Seção do Gráfico de Pizza 1 com Legenda */}
            <div className="w-full md:w-1/2 px-4 flex">
              <div className="w-full">
                {/* Gráfico de Pizza 1 */}
                <div className="flex flex-col items-center p-4">
                  <div className="flex items-center mb-4">
                    <h2 className="text-xl font-semibold">Consumo de Calorias</h2>
                    {showDatePicker && (
                      <input 
                        type="date" 
                        name="caloriesDate"
                        onChange={handleDateChange}
                        value={selectedDate}
                      />
                    )}
                    <button className="ml-2 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-xl font-bold shadow-lg sumir" onClick={handleCaloriesBTN}>
                      +
                    </button>
                  </div>
          
                  <CaloriesChart data={pieChart1} />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4 flex">
              <div className="w-full">
                <div className="flex flex-col items-center p-4">
                  <div className="flex items-center mb-4">
                    <h2 className="text-xl font-semibold">Calorias Queimadas por Treino</h2>
                  </div>
                  <CaloriesBurningChart caloriesData={pieChart2} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center w-full mt-8 sumir">
            <button onClick={toggleCharts} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 text-xl rounded-full shadow-xl mr-4">
              Mostrar Progresso
            </button>
            <button onClick={preExportPDF} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 text-xl rounded-full shadow-xl mr-4">
              Exportar PDF
            </button>
          </div>
        </div>
        <div id="canvas3" className={`${showLineChart ? '' : 'hidden'} flex justify-center w-full`}>
              <div className="w-full flex-row p-20">
                <GraphicProgress user={lineChart?.User} caloriesData={lineChart?.calories??[]} />
                <div className="flex flex-col items-center mt-5 mb-5">
                  <div className="flex justify-around w-full mb-4">
                    <h2 className="text-xl font-semibold">({week.sevenDaysAgo})</h2>
                    <h2 className="text-xl font-semibold">({week.today})</h2>
                  </div>
                </div>
                <button onClick={toggleCharts} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 text-xl rounded-full shadow-xl mt-3 sumir">
                  Voltar
                </button>
              </div>
             
          </div>
      </>      
    );
}  
