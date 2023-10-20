import React, { useState } from 'react';
import { Popover, ConfigProvider, Button, Modal, Badge } from 'antd';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { DeleteTwoTone, MessageTwoTone, ExclamationCircleFilled } from '@ant-design/icons';
import { ISpace } from '@/types/knowledge';
import DocumentContainer from './document-container';
import moment from 'moment';
import { apiInterceptors, delSpace, newDialogue } from '@/client/api';
import { useTranslation } from 'react-i18next';
import { VECTOR_ICON_MAP } from '@/utils/constants';

interface IProps {
  space: ISpace;
  onFinish: () => void;
}

const { confirm } = Modal;

export default function SpaceCard(props: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const { space, onFinish } = props;
  const [documentCount, setDocumentCount] = useState(space.docs);

  const showDeleteConfirm = () => {
    confirm({
      title: t('Tips'),
      icon: <ExclamationCircleFilled />,
      content: `${t('Del_Knowledge_Tips')}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        await apiInterceptors(delSpace({ name: space?.name }));
        onFinish();
      },
    });
  };

  const handleChat = async (e: any) => {
    e.stopPropagation();

    const [_, data] = await apiInterceptors(
      newDialogue({
        chat_mode: 'chat_knowledge',
      }),
    );
    if (data?.conv_uid) {
      router.push(`/chat?scene=chat_knowledge&id=${data?.conv_uid}&db_param=${space.name}`);
    }
  };

  const renderVectorIcon = (type: string) => {
    return (
      <Image
        className="rounded-full w-8 h-8 border border-gray-200 object-contain bg-white inline-block"
        width={36}
        height={136}
        src={VECTOR_ICON_MAP[type] || '/models/knowledge-default.jpg'}
        alt="llm"
      />
    );
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Popover: {
            zIndexPopup: 90,
          },
        },
      }}
    >
      <Popover
        className="dark:hover:border-white transition-all hover:shadow-md bg-[#FFFFFF] dark:bg-[#484848] relative  shrink-0 grow-0 cursor-pointer rounded-[10px] border border-gray-200 border-solid w-full min-[width]:80"
        placement="bottom"
        trigger="click"
        content={<DocumentContainer setDocumentCount={setDocumentCount} space={space} />}
      >
        <Badge className="min-w-min" count={documentCount || 0}>
          <div className="flex justify-between mx-6 mt-3">
            <div className="text-lg font-bold text-black truncate">
              {renderVectorIcon(space.vector_type)}
              <span className="dark:text-white ml-2">{space?.name}</span>
            </div>
            <DeleteTwoTone
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                showDeleteConfirm();
              }}
              twoToneColor="#CD2029"
              className="!text-2xl"
            />
          </div>
          <div className="text-sm mt-2  p-6 pt-2 h-40">
            <p className="font-semibold">{t('Owner')}:</p>
            <p className=" truncate">{space?.owner}</p>
            <p className="font-semibold mt-2">{t('Description')}:</p>
            <p className=" line-clamp-2">{space?.desc}</p>
            <p className="font-semibold mt-2">Last modify:</p>
            <p className=" truncate">{moment(space.gmt_modified).format('YYYY-MM-DD HH:MM:SS')}</p>
          </div>
          <div className="flex justify-center">
            <Button size="middle" onClick={handleChat} className="mr-4 dark:text-white mb-2" shape="round" icon={<MessageTwoTone />}>
              {t('Chat')}
            </Button>
          </div>
        </Badge>
      </Popover>
    </ConfigProvider>
  );
}