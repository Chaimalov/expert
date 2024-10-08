import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { Transitions, useAuth } from '../context';
import {
  colorFromEmoji,
  displayDays,
  isInUsersList,
  useClickOutside,
} from '../utils';
import { Option, Options } from './index';
import { Product } from '@expert/common';

type ProductProps = {
  mini?: boolean;
  product: Product;
};

export const ProductCard: React.FC<ProductProps> = ({ product, mini }) => {
  const [OpenEmoji, setOpenEmoji] = useState(false);
  const [OpenDate, setOpenDate] = useState(false);
  const [open, setOpen] = useState(false);

  const [menuOptions, setMenuOptions] = useState<Option[]>([]);
  const [expiryDays, setExpiryDays] = useState(Number(product.expiryDays));

  const { user } = useAuth();

  const isInList = isInUsersList(user, product);

  const close = () => {
    setOpen(false);
    setOpenEmoji(false);
    setOpenDate(false);
  };

  const updateEmoji = async (icon?: string) => {
    close();
    if (!icon) return;

    api.execute(
      api.user.updateItem(user.email, { id: product.id, emoji: icon })
    );
  };

  const editEmoji = () => {
    close();
    setOpenEmoji(true);
    setMenuOptions(
      product.emojiList.map((emoji) => ({
        text: emoji.character,
        key: emoji.slug,
        action: updateEmoji,
        type: '',
        send: emoji.character,
      }))
    );
  };

  const editDate = () => {
    close();
    setOpenDate(true);
  };

  const updateDays = (days: number) => {
    console.log('user.email', user.email, 'days:', days);
    api.execute(
      api.user.updateItem(user.email, { id: product.id, expiryDays: days })
    );
    close();
  };

  const productOptions = [
    {
      text: <AiOutlineClose className="ion" />,
      action: () => setOpen(false),
      type: 'ion',
      key: 4,
    },
    {
      text: 'edit emoji',
      action: editEmoji,
      key: 1,
    },
    {
      text: 'edit date',
      action: editDate,
      key: 2,
    },
    {
      text: isInList ? 'remove item' : 'add item',
      action: isInList
        ? () => {
            api.execute(api.user.removeItem(user.email, product.id));
            close();
          }
        : () => {
            api.execute(api.user.addItem(user.email, product));
            close();
          },
      key: 5,
      type: isInList ? 'delete' : 'add',
    },
    {
      text: 'delete',
      action: () => {
        const transaction = api.products.deleteItem(product, user.uid);

        if (transaction) {
          api.execute(transaction);
        }
      },
      key: 3,
      type: 'delete',
    },
  ];

  const domRef = useClickOutside<HTMLDivElement>(close);

  return (
    <div
      className="itemContainer"
      ref={domRef}
      style={{
        '--hue': product.emoji && colorFromEmoji(product.emoji)[0].toString(),
      }}
    >
      {!mini && (
        <>
          <Options type="emoji" open={OpenEmoji} list={menuOptions} />
          <Options type="date" open={OpenDate}>
            <form
              style={{ padding: '1rem' }}
              onSubmit={(e) => {
                e.preventDefault();
                updateDays(expiryDays);
              }}
            >
              <label className="date">
                <h4>expiry days</h4>
                <input
                  min="1"
                  type="number"
                  className="date"
                  value={expiryDays}
                  onChange={(e) => setExpiryDays(() => Number(e.target.value))}
                />
              </label>

              <button>save</button>
            </form>
          </Options>

          <Options
            open={open}
            list={user.isAdmin ? productOptions : productOptions.slice(0, 4)}
          />
        </>
      )}
      <div className={`item ${mini ? 'mini' : ''}`}>
        <div className="top">
          {product.emoji && (
            <Transitions on={product.emoji}>
              <div className="icon">{product.emoji}</div>
            </Transitions>
          )}
          {!mini && (
            <button onClick={() => setOpen(true)} className="reset">
              <IoEllipsisHorizontal className="ion" />
            </button>
          )}
        </div>
        <Link
          className="name"
          to={`/product/${product.name}`}
          state={{ ...product }}
        >
          <h3>{product.name}</h3>
        </Link>
        {!mini && (
          <>
            <h4>{product.category} </h4>
            <Transitions on={product.expiryDays}>
              <h5 className="space-between">
                {displayDays(product.expiryDays)}{' '}
                <span>{product.refrigerator && '❄️'}</span>
              </h5>
            </Transitions>
          </>
        )}
      </div>
    </div>
  );
};
