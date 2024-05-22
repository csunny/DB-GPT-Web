/*
 * @Date: 2024-05-14 15:41:13
 * @LastEditors: CZH
 * @LastEditTime: 2024-05-22 14:10:16
 * @FilePath: /DB-GPT-Web/pages/models/index.tsx
 */
import { apiInterceptors, getModelList } from '@/client/api';
import ModelCard from '@/components/model/model-card';
import ModelForm from '@/components/model/model-form';
import { IModelData } from '@/types/model';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function Models() {
  const { t } = useTranslation();
  const [models, setModels] = useState<Array<IModelData>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function getModels() {
    const [, res] = await apiInterceptors(getModelList());
    setModels(res ?? []);
  }

  useEffect(() => {
    getModels();
  }, []);

  return (
    <div className="p-4 md:p-6 overflow-y-auto">
      <Button
        className="mb-4"
        type="primary"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        {t('create_model')}
      </Button>
      <div className="flex flex-wrap gap-2 md:gap-4">
        {models.map((item) => (
          <ModelCard info={item} key={item.model_name} />
        ))}
      </div>
      <Modal
        width={800}
        open={isModalOpen}
        title={t('create_model')}
        cancelText={t('no')}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <ModelForm
          onCancel={() => {
            setIsModalOpen(false);
          }}
          onSuccess={() => {
            setIsModalOpen(false);
            getModels();
          }}
        />
      </Modal>
    </div>
  );
}

export default Models;
