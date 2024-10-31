import React, { useEffect, useState } from "react";
import { List, Card, Button, Flex, Modal, message } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";
import ReactCardFlip from "react-card-flip";
import { config } from "../../config/config";
import card from "../../img/card.png";
import "./index.css";

function removeRandomElement(arr) {
  if (arr.length === 0) return undefined; // 如果数组为空，返回undefined

  const randomIndex = Math.floor(Math.random() * arr.length); // 生成一个随机索引
  const element = arr.splice(randomIndex, 1)[0]; // 移除并返回该元素

  return element; // 返回移除的元素
}
function WordCraft() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlip, setIsFlip] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [showTip, setShowTip] = useState(false);

  const [data, setData] = useState({
    notPlayed: [...config],
    played: [],
    current: {},
  });

  useEffect(() => {
    if (isFlip) {
      const { notPlayed, played } = data;
      console.log("notPlayed", notPlayed);
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
      setShowTip(false);
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
                notPlayed: [...config],
                played: [],
                current: {},
              });
              setIsFlip(false);
            }}
          >
            Reset
          </Button>
        </Flex>
        <Modal
          className="word-craft"
          open={isOpen}
          footer={false}
          width={400}
          closable={false}
          onCancel={() => {
            setIsOpen(false);
          }}
        >
          <ReactCardFlip isFlipped={isFlip}>
            <Card
              style={{ width: 350 }}
              onClick={() => setIsFlip(true)}
              bordered={false}
            >
              <div className="card-front">
                <img src={card} alt="card" />
              </div>
            </Card>
            <Card style={{ width: 350 }}>
              <div className="card-back">
                <Card
                  title={
                    <span>
                      <span>{data.current?.topic}</span>
                      <span>
                        {" "}
                        <InfoCircleTwoTone onClick={() => setShowTip(true)} />
                      </span>
                    </span>
                  }
                  style={{ width: "100%" }}
                >
                  <div onClick={() => setIsFlip(false)}>
                    <List
                      dataSource={data.current?.words}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                    />

                    {showTip && (
                      <Card>
                        <p>{data.current?.example}</p>
                      </Card>
                    )}
                  </div>
                </Card>
              </div>
            </Card>
          </ReactCardFlip>
        </Modal>
      </div>
    </div>
  );
}

export default WordCraft;
