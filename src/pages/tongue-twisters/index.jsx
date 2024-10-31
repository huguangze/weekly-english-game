import React, { useEffect, useState } from "react";
import { Card, Button, Flex, Modal, message } from "antd";
import ReactCardFlip from "react-card-flip";
import { sentences } from "../../config/tongue-twisters";
import "./index.css";
import card from "../../img/card.png";

function removeRandomElement(arr) {
  if (arr.length === 0) return undefined; // 如果数组为空，返回undefined

  const randomIndex = Math.floor(Math.random() * arr.length); // 生成一个随机索引
  const element = arr.splice(randomIndex, 1)[0]; // 移除并返回该元素

  return element; // 返回移除的元素
}
function TongueTwisters() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlip, setIsFlip] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [data, setData] = useState({
    notPlayed: [...sentences],
    played: [],
    current: "",
  });

  useEffect(() => {
    if (isFlip) {
      const { notPlayed, played } = data;
      const current = removeRandomElement(notPlayed);
      if (!current) {
        setIsOpen(false);
        messageApi.success("Game Over");
        return;
      }
      played.push(current);

      setData({
        notPlayed,
        played,
        current,
      });
    }
  }, [isFlip]);

  return (
    <div>
      <div>
        {contextHolder}
        <Flex gap={5}>
          <Button type="primary" onClick={() => setIsOpen(true)}>
            Start
          </Button>
          <Button
            onClick={() => {
              setData({
                notPlayed: [...sentences],
                played: [],
                current: "",
              });
              setIsFlip(false);
            }}
          >
            Reset
          </Button>
        </Flex>
        <Modal
          className="togue-twister"
          open={isOpen}
          footer={false}
          width={350}
          closable={false}
          onCancel={() => {
            setIsOpen(false);
          }}
        >
          <ReactCardFlip isFlipped={isFlip}>
            <Card
              style={{ width: 300 }}
              onClick={() => setIsFlip(true)}
              bordered={false}
            >
              <div className="card-front">
                <img src={card} alt="card" />
              </div>
            </Card>
            <Card style={{ width: 300 }} onClick={() => setIsFlip(false)}>
              <div className="card-back">
                <p style={{ fontSize: "1.5em" }}>{data.current}</p>
              </div>
            </Card>
          </ReactCardFlip>
        </Modal>
      </div>
    </div>
  );
}

export default TongueTwisters;
