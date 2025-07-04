import React from "react";
import HackTerminalWrapperWithScreenBg from "../HackTerminalWrapperWithScreenBg/HackTerminalWrapperWithScreenBg";
import HackTerminalDoc from "../HackTerminalDoc/HackTerminalDoc";

const HackTerminalPrizes = () => {
  return (
    <HackTerminalWrapperWithScreenBg>
      <HackTerminalDoc title={"Список призов"}>
        В мини-игре «Взлом терминала» награды зависят от выбранной сложности:
        <ul>
          <li>
            <b>Уровень «Новичок»</b>
            <ul>
              <li>Тренировочный режим на 4 цифры.</li>
              <li>Предназначен для практики и оттачивания навыков.</li>
              <li>Награды за победу не предусмотрены.</li>
            </ul>
          </li>
          <li>
            <b>Уровень «Взломщик»</b>
            <ul>
              <li>Базовая сложность на 6 цифр.</li>
              <li>
                При успешном взломе вы получаете случайную награду из списка.
              </li>
              <li>
                Награда: <b>0,01 CP</b> (Cash Points) за победу.
              </li>
            </ul>
          </li>
          <li>
            <b>Уровень «Хакер»</b>
            <ul>
              <li>Повышенная сложность на 8 цифр.</li>
              <li>
                При успешном взломе вы также получаете одну случайную награду из
                списка.
              </li>
              <li>
                Награда: <b>0,05 CP</b> (Cash Points) за победу.
              </li>
            </ul>
          </li>
        </ul>
      </HackTerminalDoc>
    </HackTerminalWrapperWithScreenBg>
  );
};

export default HackTerminalPrizes;
